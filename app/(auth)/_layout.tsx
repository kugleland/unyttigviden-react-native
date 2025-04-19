import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { router, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: useClientOnlyValue(false, true) }}>
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: true,
          headerLeft: () => (
            <Button onPress={() => router.push("/(tabs)")}>
              <ButtonIcon as={ArrowLeftIcon} />
              <ButtonText>Back</ButtonText>
            </Button>
          ),
        }}
      />
      <Stack.Screen
        name="register"
        options={{ title: "Register", headerShown: true }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ title: "Forgot Password", headerShown: true }}
      />
    </Stack>
  );
}
