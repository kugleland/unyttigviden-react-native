import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import useAuthStore from "../../store/auth/useAuthStore";

// glustack imports
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { PersonStanding } from "lucide-react-native";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { Card } from "@/components/ui/card";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const errors = useAuthStore((state) => state.errors);
  const status = useAuthStore((state) => state.status);
  const message = useAuthStore((state) => state.message);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const clearError = useAuthStore((state) => state.clearError);
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    const result = await forgotPassword({ email });
    if (status === 200) {
      setResetLinkSent(true);
    }
  };

  return (
    <VStack className="w-full rounded-md border border-background-200 p-4">
      <Card size="md" variant="elevated" className="">
        <Box className="items-center justify-center">
          <Box className="items-center justify-center h-24 w-24 rounded-full border mb-6">
            <PersonStanding size={50} color="black" />
          </Box>
          <Text style={styles.title}>Welcome Back</Text>
        </Box>
        <Box className="items-center justify-center">
          <Text style={styles.title}>Glemt adgangskode?</Text>
        </Box>

        <Box className="items-center justify-center">
          <Text style={styles.description}>
            Indtast din e-mail adresse og vi sender dig instruktioner til at
            nulstille din adgangskode.
          </Text>
        </Box>

        {message && <Text style={styles.statusMessage}>{message}</Text>}

        <Box className="py-3">
          <FormControl
            isInvalid={errors.email}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>E-mail</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" size="md">
              <InputField
                type="text"
                placeholder="E-mail"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </Input>

            {errors.email &&
              errors.email.map((err: string) => {
                return (
                  <FormControlError key={err}>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{err}</FormControlErrorText>
                  </FormControlError>
                );
              })}
          </FormControl>
        </Box>

        {message && (
          <Box className="bg-red-500 text-white p-2 rounded-md">
            <Text className="text-center text-white">{message}</Text>
          </Box>
        )}

        <Button
          className="w-full self-end mt-4"
          size="lg"
          onPress={handleResetPassword}
        >
          <ButtonText>Nulstil adgangskode</ButtonText>
        </Button>
      </Card>

      <Box className="mt-6 flex flex-col gap-3">
        <Button onPress={() => router.push("/(auth)/login")} variant="outline">
          <ButtonText>Kommet i tanke om adgangskode? Log ind</ButtonText>
        </Button>

        <Button
          onPress={() => router.push("/(auth)/register")}
          variant="outline"
        >
          <ButtonText>Opret konto</ButtonText>
        </Button>
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
  },
  resetButton: {
    marginTop: 10,
    paddingVertical: 6,
  },
  loginLink: {
    marginTop: 10,
  },
  statusMessage: {
    marginBottom: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
});

export default ForgotPasswordScreen;
