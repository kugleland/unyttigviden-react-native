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
import { Heading } from "@/components/ui/heading";
const NotificationsScreen = () => {
  return (
    <View className="flex-1">
      <Box className="flex-1 h-full justify-center items-center p-6 mb-16 gap-3">
        <Heading>Notifikationer</Heading>

        <Text>Der er ingen notifikationer.</Text>

        <Button onPress={() => router.back()}>
          <ButtonText>Luk</ButtonText>
        </Button>
      </Box>
    </View>
  );
};

export default NotificationsScreen;
