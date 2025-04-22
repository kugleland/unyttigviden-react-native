// categories screen

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFactStore } from "@/store/useFactStore";

import { Image } from "expo-image";
import { Stack, useNavigation, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";

import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
const CategoriesScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const categories = useFactStore((state: any) => state.categories);
  const getCategories = useFactStore((state: any) => state.getCategories);

  useEffect(() => {
    getCategories();
  }, []);

  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      getCategories();
    }, [])
  );

  const AllCategories = () => {
    return (
      <TouchableOpacity
        className=" h-48 shadow-sm rounded-lg overflow-hidden mx-3   mt-3"
        onPress={() =>
          router.push({
            pathname: "/(tabs)/(facts)/show-category",
            params: {
              categoryId: "all",
            },
          })
        }
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["#60a5fa", "#93c5fd"]}
          className="w-full h-full"
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 1]}
        >
          <Card className="w-full h-full bg-transparent justify-center items-center">
            <Box className="justify-center items-center mb-4">
              <Image
                source={require("@/assets/images/logo-wide.png")}
                style={{ width: 150, height: 50 }}
                contentFit="contain"
              />
            </Box>
            <Text
              className="text-title-small font-medium text-center text-white"
              style={{
                fontWeight: "medium",
                width: "100%",
                textAlign: "center",
                color: "white",
              }}
            >
              Alle kategorier
            </Text>
          </Card>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        className="flex-1 h-48 m-1 shadow-sm rounded-lg overflow-hidden"
        onPress={() =>
          //   router.push({
          //     pathname: "/(tabs)/(facts)/show-category",
          //     params: {
          //       categoryId: item.id,
          //     },
          //   })
          router.push({
            pathname: "/(tabs)/(facts)/show-category",
            params: {
              categoryId: item.id,
            },
          })
        }
      >
        <LinearGradient
          // Background Linear Gradient
          colors={[item.color_dark, item.color_light]}
          className="w-full h-full"
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 1]}
        >
          <Card className="w-full h-full bg-transparent justify-center items-center">
            <Box className="justify-center items-center mb-4">
              <Image
                source={{ uri: item.image_url }}
                style={{ width: 50, height: 50 }}
                contentFit="contain"
              />
            </Box>

            {/* <Card.Title
            title={item.title}
            titleVariant="titleMedium"
            titleStyle={{ fontWeight: "bold" }}
          /> */}
            <Text
              className="text-title-small font-medium text-center text-white"
              style={{
                fontWeight: "medium",
                width: "100%",
                textAlign: "center",
                color: "white",
              }}
            >
              {item.title}
            </Text>
          </Card>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: "Viden" }} />
      <Box className="flex-1">
        <Box className="border-b border-gray-200 px-1 pb-3 bg-white">
          <AllCategories />
        </Box>
        <Box className="flex-1 bg-white px-3">
          <FlatList
            data={categories}
            renderItem={renderItem}
            numColumns={2}
            className="pt-3"
          />
        </Box>
      </Box>
    </>
  );
};

export default CategoriesScreen;
