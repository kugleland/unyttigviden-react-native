import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router, Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import {
  BookmarkIcon,
  HomeIcon,
  UserIcon,
  CircleHelp,
  ArrowLeftIcon,
  FileQuestion,
  Icon,
} from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Image } from "expo-image";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -10 }} {...props} />;
}

function HeaderLogo() {
  const colorScheme = useColorScheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* <Baby color={Colors[colorScheme ?? "light"].text} /> */}
      <Image
        source={require("@/assets/images/logo-wide.png")}
        style={{ width: 150, height: 50 }}
        contentFit="contain"
      />
      {/* <Bed color={Colors[colorScheme ?? "light"].text} /> */}
      {/* <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
        Sovstrup
      </Text> */}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        // tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Unyttig Viden",
          tabBarIcon: ({ color }) => (
            <HomeIcon color={color} style={{ marginBottom: 5 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="(facts)"
        options={{
          title: "Viden",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <CircleHelp color={color} style={{ marginBottom: 5 }} />
          ),
          // headerLeft: () => (
          //   <Button onPress={() => router.back()} className="ml-3">
          //     <ArrowLeftIcon size={24} color="white" />
          //   </Button>
          // ),
          // headerRight: () => (
          //   <Button
          //     onPress={() => router.navigate("/fact-search")}
          //     className="mr-3"
          //   >
          //     <SearchIcon size={24} color="white" />
          //   </Button>
          // ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Gemte",
          tabBarIcon: ({ color }) => (
            <BookmarkIcon color={color} style={{ marginBottom: 5 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <UserIcon color={color} style={{ marginBottom: 5 }} />
          ),
        }}
      />
    </Tabs>
  );
}
