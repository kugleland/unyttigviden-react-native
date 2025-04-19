import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import useAuthStore from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect, useRouter } from "expo-router";
export default function ProfileScreen() {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // useEffect(() => {
  //   console.log(token);
  //   console.log(user);
  // }, [token, user]);

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-1 items-center justify-center">
        <Text style={styles.title}>{user?.name}</Text>

        <Button
          onPress={() => {
            logout();
          }}
          style={{ marginTop: 20 }}
        >
          <ButtonText>Logout</ButtonText>
        </Button>
      </View>
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
