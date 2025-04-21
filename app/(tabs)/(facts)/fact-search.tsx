// fact search modal

import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const FactSearchModal = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a fact"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default FactSearchModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});
