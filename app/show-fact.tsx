// show fact screen

import { Stack } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import FactCard from "@/components/FactCard";
import { useLocalSearchParams } from "expo-router";
import { Box } from "@/components/ui/box";
import { Fact } from "@/types/fact";
import { Image } from "expo-image";
import { Button, ButtonText } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react-native";
import { ButtonIcon } from "@/components/ui/button";
import { useRouter } from "expo-router";
const ShowFactScreen = () => {
  const router = useRouter();
  const {
    factId,
    title,
    content,
    category_image_url,
    user_vote,
    user_bookmark,
    color,
  } = useLocalSearchParams();

  const fact: Fact = {
    id: factId as string,
    title: title as string,
    content: content as string,
    category_image_url: category_image_url as string,
    user_vote: user_vote as string,
    user_bookmark: user_bookmark as unknown as boolean,
    category_title: "",
    icon: "",
    color: color as string,
  };

  return (
    <>
      <Stack.Screen options={{ title: "Fact" }} />
      <View className="flex-1">
        <Box className="p-3 justify-center items-center">
          <Image
            source={{ uri: category_image_url }}
            style={{ width: "100%", height: 50 }}
            contentFit="contain"
          />
        </Box>
        <Box className="flex-1 h-full justify-center items-center p-6 mb-12">
          <FactCard fact={fact} />
        </Box>
        <Box className="p-3 mb-24 flex-row justify-center items-center gap-3">
          <Button onPress={() => router.back()}>
            <ButtonIcon as={ArrowLeft} />
            <ButtonText>Tilbage</ButtonText>
          </Button>
        </Box>
      </View>
    </>
  );
};

export default ShowFactScreen;
