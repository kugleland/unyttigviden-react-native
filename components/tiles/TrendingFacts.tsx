// TrendingFacts.tsx

import { useEffect } from "react";
import { useFactStore } from "../../store/useFactStore";
import { useNavigation, useTheme } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Box, List } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";

const TrendingFacts = () => {
  const trendingFacts = useFactStore((state: any) => state.trendingFacts);
  const getTrendingFacts = useFactStore((state: any) => state.getTrendingFacts);
  const router = useRouter();

  useEffect(() => {
    getTrendingFacts();
  }, []);

  return (
    <View className="w-full p-3">
      <Card className="flex-1 w-full p-3 bg-white rounded-md  gap-3 border border-gray-100 shadow-sm">
        <Heading>Trending Facts</Heading>
        <VStack space="md" reversed={false}>
          {trendingFacts.map((item: any) => (
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
                <Text>{item.title}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </VStack>
      </Card>
    </View>
  );
};

export default TrendingFacts;
