import { StyleSheet, TouchableOpacity } from "react-native";
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
import { Bell, BellRing, Icon, User } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
export default function TabOneScreen() {
  const user = useAuthStore((state: any) => state.user);
  return (
    <View className="flex-1">
      <ScrollView>
        <Box className="">
          <Card className="w-full bg-white border-b border-gray-200 px-6 py-3">
            <Box className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Avatar size="md" className="bg-purple-400">
                  {user?.profile_image_url ? (
                    <AvatarImage
                      source={{
                        uri: user.profile_image_url,
                      }}
                    />
                  ) : (
                    <User size={20} color="white" fill="white" />
                  )}
                </Avatar>
                {user?.name ? (
                  <Text className="text-md font-bold">{user?.name}</Text>
                ) : (
                  <Text className="text-md font-bold">Hej med dig!</Text>
                )}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {user && (
                  <TouchableOpacity
                    onPress={() => router.push("/notifications")}
                  >
                    {user?.notifications?.length > 0 || 1 == 1 ? (
                      <BellRing size={20} color="#0a0a0a" fill="#fcd34d" />
                    ) : (
                      <Bell size={20} color="#a8a29e" fill="#d4d4d4" />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </Box>
          </Card>
        </Box>
        <Box className="p-3">
          <DailyFact />
          <TrendingFacts />
          <NewFacts />
        </Box>
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
