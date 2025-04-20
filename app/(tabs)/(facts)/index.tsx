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
import { useRouter } from "expo-router";
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
  const categories = useFactStore((state: any) => state.categories);
  const getCategories = useFactStore((state: any) => state.getCategories);

  const [searchModalVisible, setSearchModalVisible] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      getCategories();
    }, [])
  );

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        className="flex-1 h-48 m-1 rounded-lg overflow-hidden"
        onPress={() =>
          //router.navigate("CategoryShowScreen", { category: item })
          console.log(item)
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
    <Box className="flex-1">
      {/* {searchModalVisible && (
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
          <TextInput
            placeholder="Search"
            style={{ flex: 1, backgroundColor: "white" }}
          />
          <Button mode="contained" onPress={() => setSearchModalVisible(false)}>
            Close
          </Button>
        </View>
      )} */}
      {!searchModalVisible && (
        <Box className="flex-1 bg-white p-1">
          <FlatList data={categories} renderItem={renderItem} numColumns={2} />
        </Box>
      )}
    </Box>
  );
};

export default CategoriesScreen;
