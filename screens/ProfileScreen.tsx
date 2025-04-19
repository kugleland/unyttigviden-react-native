import { View, StyleSheet } from "react-native";
import useAuthStore from "../store/auth/useAuthStore";
import { Button, Avatar, Divider, Text } from "react-native-paper";

const ProfileScreen = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  return (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        {user?.profile_photo_url ? (
          <Avatar.Image size={100} source={{ uri: user.profile_photo_url }} />
        ) : (
          <Avatar.Icon size={100} icon="account" />
        )}
        <Text variant="titleMedium" style={styles.userName}>
          {user?.name}
        </Text>
        <Text variant="bodySmall" style={styles.userEmail}>
          {user?.email}
        </Text>
      </View>

      <Divider />
      <Button
        mode="contained"
        onPress={() => {
          useAuthStore.getState().logout();
        }}
        style={{ marginTop: 20 }}
      >
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userInfoSection: {
    padding: 20,
    alignItems: "center",
    marginTop: 50,
  },
  userName: {
    marginTop: 10,
    fontWeight: "bold",
  },
  userEmail: {
    marginTop: 4,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
