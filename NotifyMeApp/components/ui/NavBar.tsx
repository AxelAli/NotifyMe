import React, { useState } from "react";
import { Text, TopNavigation } from "@ui-kitten/components";

import DateTimePickerModal from "react-native-modal-datetime-picker";
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
  addNewCallback: (seconds: number) => void;
  requestServerNotification: () => void;
}) => {
  const [showPicker, setshowPicker] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();

  const confirmPickerTime = time => {
    addNewCallback(time);
    setshowPicker(false);
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
            const t = new Date();
            addNewCallback(t.setSeconds(t.getSeconds() + 4));
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
      <DateTimePickerModal
        headerTextIOS="Pick a time"
        isVisible={showPicker}
        mode="time"
        onConfirm={confirmPickerTime}
        onCancel={cancelPickerTime}
      />
    </>
  );
};
