import { useCallback, useEffect } from "react";
import { useFactStore } from "../../store/useFactStore";
import { useNavigation, useTheme } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box, List } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { router, useFocusEffect, useRouter } from "expo-router";
import { Text } from "@/components/ui/text";

export default function BookmarksScreen() {
  const bookmarks = useFactStore((state: any) => state.bookmarks);
  const getBookmarks = useFactStore((state: any) => state.getBookmarks);
  const router = useRouter();
  useEffect(() => {
    getBookmarks();
  }, []);

  useFocusEffect(
    // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
    useCallback(() => {
      getBookmarks();
    }, [])
  );

  return (
    <View className="w-full p-3 flex-1">
      <Card className="flex-1 w-full p-3 bg-white rounded-md  gap-3 border border-gray-100 shadow-sm">
        <Heading>Bookmarks</Heading>
        <VStack space="md" reversed={false}>
          {bookmarks.map((item: any) => (
            <TouchableOpacity
              className=""
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/show-fact",
                  params: {
                    factId: item.id,
                    title: item.title,
                    content: item.content,
                    category_image_url: item.category_image_url,
                    user_vote: item.user_vote,
                    user_bookmark: item.user_bookmark,
                  },
                })
              }
            >
              <Card className="rounded-md p-3 w-full border border-gray-300 ">
                <View className="flex-row w-full">
                  <Avatar className="mr-4">
                    {/* <AvatarFallbackText>XX</AvatarFallbackText> */}
                    <AvatarImage
                      source={{
                        uri: item.category_image_url,
                      }}
                    />
                  </Avatar>
                  <VStack className="flex-1">
                    <Heading size="md" className="mb-1">
                      {item.title}
                    </Heading>
                    <Text size="sm">{item.category_title}</Text>
                  </VStack>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </VStack>
      </Card>
    </View>
  );
}
