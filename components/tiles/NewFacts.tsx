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
      <Card className="flex-1 w-full p-3 bg-white rounded-md  gap-3 border border-gray-100 shadow-sm">
        <Heading>Nyeste Facts</Heading>
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

export default NewFacts;
