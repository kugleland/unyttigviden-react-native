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
    <VStack>
      <Text>Register</Text>
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
