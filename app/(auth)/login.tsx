import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import useAuthStore from "../../store/auth/useAuthStore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

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
import { Stack, useRouter } from "expo-router";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((state) => state.login);
  const clearError = useAuthStore((state) => state.clearError);
  const errors = useAuthStore((state) => state.errors);
  const message = useAuthStore((state) => state.message);
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  const handleLogin = async () => {
    clearError();
    const result = await login({ email, password, device_id: "1234567890" });
  };

  useEffect(() => {
    if (token) {
      router.push("/(tabs)/profile");
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      clearError();
    }, [])
  );

  return (
    <>
      <VStack className="w-full rounded-md border border-background-200 p-4">
        <Box className="items-center justify-center">
          <Box className="items-center justify-center h-24 w-24 rounded-full border mb-6">
            <PersonStanding size={50} color="black" />
          </Box>
          <Text style={styles.title}>Welcome Back</Text>
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
            {/* <FormControlHelper>
          <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText>
        </FormControlHelper> */}

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
            {/* <FormControlHelper>
          <FormControlHelperText>
            Must be atleast 6 characters.
          </FormControlHelperText>
        </FormControlHelper> */}

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

        {message && (
          <View className="bg-red-500 text-white p-2 rounded-md">
            <Text>{message}</Text>
          </View>
        )}

        <Button
          className="w-full self-end mt-4"
          size="lg"
          onPress={handleLogin}
        >
          <ButtonText>Log ind</ButtonText>
        </Button>

        <Box className="mt-6 flex flex-col gap-3">
          <Button
            onPress={() => router.push("/(auth)/register")}
            variant="outline"
          >
            <ButtonText>Opret konto</ButtonText>
          </Button>

          <Button
            onPress={() => router.push("/(auth)/forgot-password")}
            variant="outline"
          >
            <ButtonText>Glemt adgangskode?</ButtonText>
          </Button>
        </Box>
      </VStack>
    </>
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
  loginButton: {
    marginTop: 20,
    paddingVertical: 6,
  },
  forgotPassword: {
    marginTop: 10,
  },
  registerButton: {
    marginTop: 10,
    paddingVertical: 6,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
});

export default LoginScreen;
