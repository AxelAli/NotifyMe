import { Text, TopNavigation } from "@ui-kitten/components";

import React from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";

const options = ["Notify me in 15 seconds", "Notify me in custom time", "Send me a server notification", "Cancel"];

export const NavBar = ({ addNewCallback }: { addNewCallback: () => void }) => {

  const { showActionSheetWithOptions } = useActionSheet();
  const createNewNotification = () =>
    showActionSheetWithOptions(
      {
        options,
        title: "What would you want to do?"
      },
      console.log
    )

  return <TopNavigation
    title="NotifyMe"
    alignment="center"
    rightControls={<Text onPress={createNewNotification}>Add New</Text>}
  />
}
