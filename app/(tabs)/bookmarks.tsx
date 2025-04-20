import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { View } from "@/components/Themed";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

export default function BookmarksScreen() {
  return (
    <View style={styles.container}>
      <Box className="bg-primary-500 p-5">
        <Text className="text-typography-0">This is the Box</Text>
      </Box>
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
