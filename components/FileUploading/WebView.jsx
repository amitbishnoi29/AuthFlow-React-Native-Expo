import { WebView } from "react-native-webview";

import { StyleSheet } from "react-native";

export default function WebViewDocument({ uri }) {
  return (
    <WebView style={styles.container} source={{ uri: "https://expo.dev" }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
