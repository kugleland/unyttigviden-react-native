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
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { router, useFocusEffect, useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import useAuthStore from "@/store/auth/useAuthStore";
import { Image } from "expo-image";
export default function BookmarksScreen() {
  const bookmarks = useFactStore((state: any) => state.bookmarks);
  const user = useAuthStore((state: any) => state.user);
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
        {bookmarks.length > 0 ? (
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
                      color: item.color,
                    },
                  })
                }
              >
                <Card className="rounded-md p-3 w-full border border-gray-300 ">
                  <View className="flex-row w-full">
                    {/* <Avatar className="mr-4">
                      {item.category_image_url ? (
                        <AvatarImage
                          source={{
                            uri: item.category_image_url,
                          }}
                        />
                      ) : (
                        <AvatarFallbackText>{item.title}</AvatarFallbackText>
                      )}
                    </Avatar> */}
                    <Box className="mr-4">
                      <Image
                        source={{
                          uri: item.category_image_url,
                        }}
                        style={{ width: 40, height: 40 }}
                      />
                    </Box>
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
        ) : (
          <Box className="flex-1 items-center justify-center gap-3">
            {user ? (
              <Text>Ingen gemte fakta</Text>
            ) : (
              <>
                <Text>Log ind for at gemme fakta.</Text>
                <Button onPress={() => router.push("/login")}>
                  <ButtonText>Log ind</ButtonText>
                </Button>
              </>
            )}
          </Box>
        )}
      </Card>
    </View>
  );
}
