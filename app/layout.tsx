import "@/css/style.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "@/providers/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Erika Store",
  description: "Website Topup Sederhana",
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;
