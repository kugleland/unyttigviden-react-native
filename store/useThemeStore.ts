// theme store

import { create } from "zustand";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";
import { Colors } from "../theme/colors";

type ThemeType = "light" | "dark";

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colors: typeof Colors.light | typeof Colors.dark;
  paperTheme: typeof MD3LightTheme | typeof MD3DarkTheme;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  colors: Colors.light,
  paperTheme: {
    ...MD3LightTheme,
    colors: Colors.light,
  },
  setTheme: (theme: ThemeType) =>
    set({
      theme,
      colors: Colors[theme],
      paperTheme: {
        ...(theme === "light" ? MD3LightTheme : MD3DarkTheme),
        colors: Colors[theme],
      },
    }),
}));