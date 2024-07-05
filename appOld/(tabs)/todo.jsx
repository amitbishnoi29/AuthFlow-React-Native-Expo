import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ScrollView,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import * as DocumentPicker from "expo-document-picker";
import WebViewDocument from "../../components/FileUploading/WebView";
import { router, useRouter } from "expo-router";

export default function TabThreeScreen() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const [document, setDocument] = useState(null);

  const pickDocument = async () => {
    const router = useRouter()
    let result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setDocument(result.assets[0]);
      // console.log(result.assets[0])
    }
  };

  const addTask = () => {
    if (task.length > 0) {
      setTasks([...tasks, { key: Math.random().toString(), value: task }]);
      setTask("");
    }
  };

  return (
    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    //   headerImage={
    //     <Ionicons size={310} name="code-slash" style={styles.headerImage} />
    //   }
    // >
    <SafeAreaView>
      <Button title="Pick a document" onPress={pickDocument} />
      <Button title="Sign Up" onPress={() => router.push('/signup')} />
      {/* {document && (
          <ScrollView style={{ marginTop: 20 }}>
          <ThemedText>URI: {document.uri}</ThemedText>
          <ThemedText>Name: {document.name}</ThemedText>
          <ThemedText>Size: {document.size} bytes</ThemedText>
          <ThemedText>Type: {document.mimeType}</ThemedText>
          </ScrollView>
        )} */}

      <WebViewDocument/>

      {/* <ThemedText type="title">Hello there</ThemedText>
      <View style={styles.container}>
      <TextInput
      placeholder="Add a new task"
      value={task}
      onChangeText={setTask}
      style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
      data={tasks}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
          <Text style={styles.task}>{item.value}</Text>
        )}
        ListHeaderComponent={
            <View>
              <ThemedText>Tasks</ThemedText>
            </View>
        }
        />
    </View> */}
    </SafeAreaView>
    // </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filePicker: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  task: {
    padding: 10,
    backgroundColor: "gray",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
