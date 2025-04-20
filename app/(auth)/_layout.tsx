import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon, CloseIcon } from "@/components/ui/icon";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View } from "react-native";

export default function AuthLayout() {
  const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";

  return (
    <Stack screenOptions={{ headerShown: useClientOnlyValue(false, true) }}>
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
          animation: "default",
          headerTitle: "",
          headerRight: () => (
            <Button onPress={() => router.dismissAll()} variant="outline">
              <ButtonIcon as={CloseIcon} />
              <ButtonText>Luk</ButtonText>
            </Button>
          ),
          headerLeft: () => <View></View>,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
          headerShown: false,
          animation: "default",
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          title: "Forgot Password",
          headerShown: false,
          animation: "default",
        }}
      />
    </Stack>
  );
}
