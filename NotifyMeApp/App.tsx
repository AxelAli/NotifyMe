import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet'
import {
  ApplicationProvider,
  IconRegistry,
  Layout
} from "@ui-kitten/components";
import { dark as darkTheme, mapping } from "@eva-design/eva";

import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavBar } from "./components/ui/NavBar";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, currentRoute: "search" };
  }

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={darkTheme}>
          <ActionSheetProvider>
            <Layout style={{ flex: 1 }}>
              <NavBar addNewCallback={() => null} />
            </Layout>
          </ActionSheetProvider>
        </ApplicationProvider>
      </>
    );
  }
}

export default (App)

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
