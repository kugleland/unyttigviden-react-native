// show fact screen

import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import FactCard from "@/components/FactCard";
import { useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { Fact } from "@/types/fact";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
const LoginNeededScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Login nødvendig" }} />
      <View className="flex-1">
        <Box className="p-3 justify-center items-center">
          {/* <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: "100%", height: 50 }}
            contentFit="contain"
          /> */}
        </Box>
        <Box className="flex-1 h-full justify-center items-center p-6 mb-16">
          <Text>Login nødvendig</Text>
          <Button onPress={() => router.replace("/login")}>
            <ButtonText>Log ind</ButtonText>
          </Button>
        </Box>
      </View>
    </>
  );
};

export default LoginNeededScreen;
