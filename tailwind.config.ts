import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.tsx",
    "./src/components/**/*.tsx",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [heroui()],
} satisfies Config;
