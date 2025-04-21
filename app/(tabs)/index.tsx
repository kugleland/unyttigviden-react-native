import { StyleSheet } from "react-native";
import useAuthStore from "@/store/auth/useAuthStore";
import EditScreenInfo from "@/components/EditScreenInfo";
import { View } from "@/components/Themed";
import { ScrollView } from "react-native";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import DailyFact from "@/components/tiles/DailyFact";
import { Card } from "@/components/ui/card";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import TrendingFacts from "@/components/tiles/TrendingFacts";
import { SafeAreaView } from "react-native-safe-area-context";
import NewFacts from "@/components/tiles/NewFacts";
export default function TabOneScreen() {
  const user = useAuthStore((state: any) => state.user);
  return (
    <View className="flex-1 p-3">
      <ScrollView>
        <View className="">
          <Box className="p-3">
            <Card className="w-full bg-white shadow-sm border border-gray-100">
              <Box
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Avatar size="lg" className="mb-3">
                    {user?.profile_image_url ? (
                      <AvatarImage
                        source={{
                          uri: user.profile_image_url,
                        }}
                      />
                    ) : (
                      <AvatarFallbackText>{user?.name}</AvatarFallbackText>
                    )}
                    <AvatarBadge />
                  </Avatar>
                  {user?.name ? (
                    <Text className="text-md font-bold">{user?.name}</Text>
                  ) : (
                    <Text className="text-md font-bold">Hi there!</Text>
                  )}
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* <IconButton
                icon="bell"
                size={20}
                onPress={() => console.log("Pressed")}
              /> */}
                </View>
              </Box>
            </Card>
          </Box>
          <DailyFact />
          <TrendingFacts />
          <NewFacts />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
