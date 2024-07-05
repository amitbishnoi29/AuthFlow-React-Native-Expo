import { Redirect, Stack, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthContext } from "@/context/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const session = useAuthContext();
  const { state } = session;
  console.log(state);
  if (state.userToken) {
    return <Redirect href="/" />;
  }
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
    //     headerShown: false,
    //   }}
    //   initialRouteName="sign-in"
    // >
    //   <Tabs.Screen
    //     name="sign-up"
    //     options={{
    //       title: "Sign Up",
    //       tabBarIcon: ({ color, focused }) => (
    //         <TabBarIcon
    //           name={focused ? "home" : "home-outline"}
    //           color={color}
    //         />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="sign-in"
    //     options={{
    //       title: "Sign In",
    //       tabBarIcon: ({ color, focused }) => (
    //         <TabBarIcon
    //           name={focused ? "code-slash" : "code-slash-outline"}
    //           color={color}
    //         />
    //       ),
    //     }}
    //   />

    // </Tabs>
  );
}
