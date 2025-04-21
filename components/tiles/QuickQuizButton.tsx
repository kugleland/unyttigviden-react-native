// quick quiz button

import { Text, Card, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";

const QuickQuizButton = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View style={{ padding: 10 }}>
      <Card
        style={{
          // backgroundColor: theme.colors.secondaryContainer,
          paddingTop: 10,
          paddingBottom: 10,
        }}
        elevation={1}
      >
        <Card.Title
          title="Quick Quiz"
          titleVariant="titleLarge"
          titleStyle={{ textAlign: "center" }}
        />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("QuizShowScreen")}
          >
            Quick Quiz
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default QuickQuizButton;
