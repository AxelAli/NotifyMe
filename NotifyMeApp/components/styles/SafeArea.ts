import { Platform } from "react-native";
import theme from "./theme";

export default {
  flex: 1,
  backgroundColor: theme["color-basic-800"],
  paddingTop: Platform.OS === "android" ? 25 : 0
};
