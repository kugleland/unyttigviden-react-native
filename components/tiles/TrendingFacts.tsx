// TrendingFacts.tsx

import { useEffect } from "react";
import { useFactStore } from "../../store/useFactStore";
import { useNavigation, useTheme } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Flame } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { Icon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";
import { LinearGradient } from "expo-linear-gradient";
const TrendingFacts = () => {
  const trendingFacts = useFactStore((state: any) => state.trendingFacts);
  const getTrendingFacts = useFactStore((state: any) => state.getTrendingFacts);
  const router = useRouter();

  useEffect(() => {
    getTrendingFacts();
  }, []);

  return (
    <View className="w-full p-3">
      <View className="flex-1 rounded-lg shadow-sm overflow-hidden">
        <LinearGradient
          // Background Linear Gradient
          colors={["#fbbf24", "#fcd34d"]} // #dab2ff
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          locations={[0.5, 1]}
          className="flex-1 rounded-lg shadow-sm"
        >
          <Card className="flex-1 w-full p-3 bg-transparent gap-3">
            <View className="flex-row justify-start items-center py-3 gap-3 px-3">
              <Box className="bg-white rounded-full p-2 w-12 h-12">
                <Flame size={26} color="orange" fill="orange" />
              </Box>
              <Heading className="text-white ml-1" size="lg">
                Trending Facts
              </Heading>
            </View>
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
                        color: item.color,
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
        </LinearGradient>
      </View>
    </View>
  );
};

export default TrendingFacts;
