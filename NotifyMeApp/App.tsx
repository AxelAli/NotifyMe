import * as Permissions from "expo-permissions";

import {
  ApplicationProvider,
  Icon,
  IconRegistry,
  Layout,
  ListItem
} from "@ui-kitten/components";
import { Constants, Notifications } from "expo";

import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { IAppState } from "./components/types/App";
import { NavBar } from "./components/ui/NavBar";
import React from "react";
import SafeAreaStyles from "./components/styles/SafeArea";
import { SafeAreaView } from "react-native";
import { mapping } from "@eva-design/eva";
import moment from "moment";
import theme from "./components/styles/theme";

class App extends React.Component<any, IAppState> {
  constructor(props) {
    super(props);
    this.state = { notifications: [] };
    Permissions.getAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
      status === "undetermined"
        ? Permissions.askAsync(Permissions.NOTIFICATIONS)
        : status === "denied"
        ? alert("Must Enable notifications")
        : null;
    });
  }

  
  setNotificationInSeconds = time => {
    Notifications.scheduleLocalNotificationAsync(
      {
        title: "You asked me to remind you",
        body: "Uhh... rememeber eating fruits and vegetables"
      },
      { time }
    ).then(id => {
      this.setState(({ notifications }) => ({
        notifications: [
          ...notifications,
          { id: id.toString(), time, type: "user", completed: false }
        ]
      }));
    });
  };

  render() {
    const { notifications } = this.state;
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme}>
          <ActionSheetProvider>
            <SafeAreaView style={SafeAreaStyles}>
              <Layout style={{ flex: 1 }}>
                <NavBar
                  addNewCallback={this.setNotificationInSeconds}
                  requestServerNotification={() => null}
                />
                {notifications.length
                  ? notifications.map(({ id, time, type, completed }) => (
                      <ListItem
                        key={id}
                        title={`Requested by ${type}`}
                        description={`${
                          completed ? "Notified" : "Will notifity"
                        } you @ ${moment(time).format("HH:mm:ss")}`}
                      />
                    ))
                  : null}
              </Layout>
            </SafeAreaView>
          </ActionSheetProvider>
        </ApplicationProvider>
      </>
    );
  }
}

export default App;
