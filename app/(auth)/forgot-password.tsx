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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const errors = useAuthStore((state) => state.errors);
  const status = useAuthStore((state) => state.status);
  const message = useAuthStore((state) => state.message);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const clearError = useAuthStore((state) => state.clearError);
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const handleResetPassword = async () => {
    const result = await forgotPassword({ email });
    if (status === 200) {
      setResetLinkSent(true);
    }
  };

  return (
    <VStack>
      <Text>Glemt adgangskode</Text>
      <Text>Indtast din e-mail for at få adgangskoden tilbage</Text>
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
