import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon, CloseIcon } from "@/components/ui/icon";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";

export default function FactsLayout() {
  const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";

  return (
    <Stack screenOptions={{ headerShown: useClientOnlyValue(false, true) }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Facts",
          headerShown: false,
          animation: "default",
        }}
      />
    </Stack>
  );
}
