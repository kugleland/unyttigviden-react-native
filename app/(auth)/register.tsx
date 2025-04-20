import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import useAuthStore from "../../store/auth/useAuthStore";

// glustack imports
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { PersonStanding } from "lucide-react-native";
import { Card } from "@/components/ui/card";
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

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const clearError = useAuthStore((state) => state.clearError);
  const errors = useAuthStore((state) => state.errors);
  const message = useAuthStore((state) => state.message);
  const router = useRouter();

  const register = useAuthStore((state) => state.register);
  const handleRegister = () => {
    register({
      name,
      email,
      password,
      password_confirmation: confirmPassword,
      device_id: "1234567890",
    });
  };

  useFocusEffect(
    useCallback(() => {
      clearError();
    }, [])
  );

  return (
    <VStack className="w-full rounded-md border border-background-200 p-4">
      <Card size="md" variant="elevated" className="">
        <Box className="items-center justify-center py-3">
          {/* <Box className="items-center justify-center h-24 w-24 rounded-full border mb-6">
          <PersonStanding size={50} color="black" />
        </Box> */}
          <Text style={styles.title}>Velkommen til Unyttig Viden</Text>
        </Box>
        <Box className="pb-3">
          <FormControl
            isInvalid={errors.name}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Navn</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" size="md">
              <InputField
                type="text"
                placeholder="Navn"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </Input>

            {errors.name &&
              errors.name.map((err: string) => {
                return (
                  <FormControlError key={err}>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{err}</FormControlErrorText>
                  </FormControlError>
                );
              })}
          </FormControl>
        </Box>
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

        <Box className="py-3">
          <FormControl
            isInvalid={errors.password}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Adgangskode</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" size="md">
              <InputField
                type="password"
                placeholder="Adgangskode"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </Input>

            {errors.password &&
              errors.password.map((err: string) => {
                return (
                  <FormControlError key={err}>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{err}</FormControlErrorText>
                  </FormControlError>
                );
              })}
          </FormControl>
        </Box>

        <Box className="py-3">
          <FormControl
            isInvalid={errors.password_confirmation}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Bekræft adgangskode</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1" size="md">
              <InputField
                type="password"
                placeholder="Bekræft adgangskode"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
            </Input>

            {errors.password_confirmation &&
              errors.password_confirmation.map((err: string) => {
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
          onPress={handleRegister}
        >
          <ButtonText>Opret konto</ButtonText>
        </Button>
      </Card>

      <Box className="mt-6 flex flex-col gap-3 p-3">
        <Button
          onPress={() => router.push("/(auth)/login")}
          variant="outline"
          size="md"
        >
          <ButtonText>Har du allerede en konto? Log ind</ButtonText>
        </Button>

        <Button
          onPress={() => router.push("/(auth)/forgot-password")}
          variant="outline"
        >
          <ButtonText>Glemt adgangskode?</ButtonText>
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
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  registerButton: {
    marginTop: 20,
    paddingVertical: 6,
  },
  loginLink: {
    marginTop: 10,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
});

export default RegisterScreen;
