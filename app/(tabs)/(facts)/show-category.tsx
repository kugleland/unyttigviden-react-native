// category show screen

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import PagerView from "react-native-pager-view";

import { Category, Fact } from "@/types/fact";

import { Image } from "expo-image";
import FactCard from "@/components/FactCard";
import { useFactStore } from "@/store/useFactStore";

// glustack ui
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  useRouter,
  useLocalSearchParams,
  useGlobalSearchParams,
  Stack,
} from "expo-router";
const CategoryShowScreen = ({ route }: { route: any }) => {
  const [categoryItem, setCategoryItem] = useState<Category | null>(null);

  const router = useRouter();
  const params = useLocalSearchParams();

  const { categoryId } = params;

  const getCategory = useFactStore((state: any) => state.getCategory);
  useEffect(() => {
    getCategory(categoryId);
  }, []);

  const category: Category = useFactStore((state: any) => state.category);
  const facts: Fact[] = useFactStore((state: any) => state.facts);

  const [currentPage, setCurrentPage] = useState(0);

  //   useEffect(() => {
  //     router.setOptions({
  //       title: category.title,
  //     });
  //   }, []);

  const handlePageSelected = (state: any) => {
    let newPosition = state.nativeEvent.position;
    //console.log("newPosition", newPosition);
    if (newPosition > 2) {
      newPosition = 0;

      // setTimeout(() => {
      //   setCurrentPage(newPosition);
      // }, 1000);
    } else {
    }
    setCurrentPage(newPosition);
  };

  const handlePageScrollStateChanged = (state: any) => {
    // console.log(`Page scroll state changed to ${state}`, state);
    // setCurrentPage(state.nativeEvent.position);
  };

  return (
    <>
      <Stack.Screen options={{ title: category.title }} />
      <View className="flex-1">
        <Box className="p-4 justify-center items-center">
          <Image
            source={{ uri: category.image_url }}
            style={{ width: "100%", height: 50 }}
            contentFit="contain"
          />
        </Box>
        {facts && facts.length > 0 ? (
          <PagerView
            style={styles.pagerView}
            initialPage={0}
            onPageSelected={handlePageSelected}
            onPageScrollStateChanged={handlePageScrollStateChanged}
          >
            {facts.map((item: Fact) => (
              <View
                className="flex-1 h-full justify-center items-center p-6"
                key={item.id}
              >
                <FactCard fact={item} />
              </View>
            ))}
            <View style={styles.page}>
              <Text>Ikke flere facts i denne kategori</Text>
              <Button onPress={() => router.back()} style={{ marginTop: 20 }}>
                <ButtonText>Vælg en ny kategori</ButtonText>
              </Button>
            </View>
          </PagerView>
        ) : (
          <Text>Ingen facts i denne kategori</Text>
        )}

        {facts.length > 1 && (
          <View style={styles.pagination}>
            {[1, 2, 3].map((item: number, index: number) => (
              <View
                style={[
                  styles.paginationItem,
                  {
                    backgroundColor: index === currentPage ? "black" : "gray",
                  },
                ]}
                key={index}
              ></View>
            ))}
          </View>
        )}
      </View>
    </>
  );
};

export default CategoryShowScreen;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    //width: "100%",
    //backgroundColor: "red",
    // marginLeft: 20,
    // marginRight: 20,
  },
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 20,
    flex: 1,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    flex: 1,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    //backgroundColor: "red",
    marginBottom: 20,
  },
  paginationItem: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "gray",
    marginLeft: 2,
    marginRight: 2,
  },
});
