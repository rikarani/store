import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.tsx",
    "./src/components/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [nextui()],
} satisfies Config;
