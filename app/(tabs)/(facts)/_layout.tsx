import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon, CloseIcon, Icon } from "@/components/ui/icon";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";
import { SearchIcon } from "lucide-react-native";

export default function FactsLayout() {
  const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";

  return (
    <Stack screenOptions={{ headerShown: useClientOnlyValue(false, true) }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Facts",
          headerShown: true,
          animation: "default",
        }}
      />
      <Stack.Screen
        name="fact-search"
        options={{
          title: "Søg",
          headerShown: false,
          animation: "default",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="show-category"
        options={{
          title: "Viden",
          headerShown: true,
          animation: "default",
        }}
      />
    </Stack>
  );
}
