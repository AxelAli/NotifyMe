import React, { useState } from "react";
import { Text, TopNavigation } from "@ui-kitten/components";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useActionSheet } from "@expo/react-native-action-sheet";

const options = [
  "Notify me in 15 seconds",
  "Notify me in custom time",
  "Send me a server notification",
  "Cancel"
];

export const NavBar = ({
  addNewCallback,
  requestServerNotification
}: {
  addNewCallback: (date: Date) => void;
  requestServerNotification: () => void;
}) => {
  const [showPicker, setshowPicker] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const confirmPickerTime = time => {
    if (time > Date.now()) {
      addNewCallback(time);

      setshowPicker(false);
    } else {
      alert("Time must be in the future");
    }
  };
  const cancelPickerTime = () => setshowPicker(false);

  const createNewNotification = () =>
    showActionSheetWithOptions(
      {
        options,
        title: "What would you like to do?"
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            const now = moment.now();
            console.log(moment(now), moment(now).add(15, "seconds"));
            addNewCallback(
              moment(now)
                .add(15, "seconds")
                .toDate()
            );
            break;
          case 1:
            setshowPicker(true);
            break;
          case 2:
            requestServerNotification();
        }
      }
    );

  return (
    <>
      <TopNavigation
        title="NotifyMe"
        alignment="center"
        rightControls={<Text onPress={createNewNotification}>Add New</Text>}
      />
      {showPicker && (
        <DateTimePickerModal
          headerTextIOS="Pick a time"
          isVisible
          mode="time"
          onConfirm={confirmPickerTime}
          onCancel={cancelPickerTime}
        />
      )}
    </>
  );
};
