import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import useAuthStore from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { router } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect, useRouter } from "expo-router";

import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
export default function ProfileScreen() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // useEffect(() => {
  //   console.log(token);
  //   console.log(user);
  // }, [token, user]);

  return (
    <Box className="flex-1 items-center justify-center p-3">
      <Card className="items-center justify-center p-6 mb-6 w-full">
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
        <Heading size="md" className="mb-1">
          {user?.name}
        </Heading>
        <Text>{user?.email}</Text>
      </Card>

      {token ? (
        <Button
          onPress={() => {
            logout();
          }}
        >
          <ButtonText>Logout</ButtonText>
        </Button>
      ) : (
        <Button onPress={() => router.push("/(auth)/login")}>
          <ButtonText>Login</ButtonText>
        </Button>
      )}
    </Box>
  );
}
