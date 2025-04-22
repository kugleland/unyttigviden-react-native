// DailyFact.tsx

import { View } from "react-native";
import { useFactStore } from "../../store/useFactStore";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

// gluestack ui
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";

const DailyFact = () => {
  const dailyFact = useFactStore((state: any) => state.dailyFact);
  const getDailyFact = useFactStore((state: any) => state.getDailyFact);

  const router = useRouter();

  const LeftContent = (props: any) => (
    // <Avatar.Icon {...props} icon="head-question" size={50} />
    <Text></Text>
  );

  const LeftContentFact = (props: any) => (
    // <Avatar.Icon
    //   {...props}
    //   icon={dailyFact.icon}
    //   style={{ backgroundColor: dailyFact.color }}
    //   color="white"
    // />
    <Text></Text>
  );

  useEffect(() => {
    getDailyFact();
  }, []);
  return (
    <Box className="p-3">
      <TouchableOpacity
        className="shadow-sm rounded-lg"
        onPress={() => {
          router.push({
            pathname: "/show-fact",
            params: {
              factId: dailyFact.id,
              title: dailyFact.title,
              content: dailyFact.content,
              category_image_url: dailyFact.category_image_url,
              user_vote: dailyFact.user_vote,
              user_bookmark: dailyFact.user_bookmark,
              color: dailyFact.color,
            },
          });
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          colors={["#c084fc", "#d8b4fe"]} // #dab2ff
          style={styles.background}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          locations={[0.5, 1]}
          className=""
        >
          <Card className="bg-transparent">
            <Box className="flex-row justify-start items-center pb-3 gap-3 px-3">
              <Box className="bg-white rounded-full p-2 w-12 h-12">
                {dailyFact.category_image_url && (
                  <Image
                    source={{ uri: dailyFact.category_image_url }}
                    style={{ width: 30, height: 30 }}
                    contentFit="contain"
                  />
                )}
              </Box>
              <Heading className="text-white ml-1" size="lg">
                Dagens Fact
              </Heading>
            </Box>
            <Box>
              {/* <Text>{dailyFact.content}</Text> */}
              <View style={{ paddingTop: 10 }}>
                <Card>
                  <Heading>{dailyFact.title}</Heading>
                  <Text>{dailyFact.content}</Text>
                </Card>
              </View>
            </Box>
          </Card>
        </LinearGradient>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    borderRadius: 10,
  },
});

export default DailyFact;
