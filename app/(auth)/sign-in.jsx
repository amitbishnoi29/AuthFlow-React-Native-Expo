import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuthContext } from "@/context/AuthContext";
import { Link } from "expo-router";
import { Image } from "expo-image";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { signIn } = useAuthContext();

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Email or Password cannnot be blank");
      return;
    }
    try {
      setLoading(true);
      const res = await signIn({ email, password });
      if (res) {
        setResponse(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView
        style={{
          width: "100%",
          padding: 20,
          gap: 10,
          justifyContent: "center",
          alignItems:'center'
        }}
      >
        <Image
          source="https://dukj6d9mkq21l.cloudfront.net/logo.svg"
          style={{ width: 207, height: 40 }}
          alt="Logo"
        />

        <ThemedText style={{ textAlign: "center", marginBottom: 20 }}>
          SignIn screen
        </ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        {!loading ? (
          <Button
            title="Sign In"
            disabled={loading}
            onPress={handleSignIn}
          ></Button>
        ) : (
          <ActivityIndicator style={{ height: 35.4 }} />
        )}
        {response && <Text style={{ color: "red" }}>{response?.message}</Text>}
        <ThemedText>
          Don't have an account. <Link href="sign-up">Sign Up</Link>
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    padding: 20,
    color:'red',
    alignSelf:'left',
    width:'100%',
    
  },
});
