// new facts

import { useEffect } from "react";
import { useFactStore } from "../../store/useFactStore";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

// gluestack ui imports
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { VStack } from "../ui/vstack";
import { LinearGradient } from "expo-linear-gradient";
import { Box } from "@/components/ui/box";
import { Newspaper } from "lucide-react-native";

const NewFacts = () => {
  const newFacts = useFactStore((state: any) => state.newFacts);
  const getNewFacts = useFactStore((state: any) => state.getNewFacts);
  const router = useRouter();
  // const LeftContent = (props: any) => (
  //   <Avatar.Icon {...props} icon="alert-decagram" />
  // );

  useEffect(() => {
    getNewFacts();
  }, []);

  return (
    <View className="w-full p-3">
      <View className="flex-1 rounded-lg shadow-sm overflow-hidden">
        <LinearGradient
          // Background Linear Gradient
          colors={["#60a5fa", "#93c5fd"]} // #dab2ff
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          locations={[0.5, 1]}
          className="flex-1 rounded-lg shadow-sm"
        >
          <Card className="flex-1 w-full p-3 bg-transparent gap-3">
            <View className="flex-row justify-start items-center py-3 gap-3 px-3">
              <Box className="bg-white rounded-full p-2 w-12 h-12">
                <Newspaper size={26} color="#38bdf8" fill="white" />
              </Box>
              <Heading className="text-white ml-1" size="lg">
                Nyeste Facts
              </Heading>
            </View>
            <VStack space="md" reversed={false}>
              {newFacts.map((item: any) => (
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

export default NewFacts;
