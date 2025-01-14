import type { Metadata } from "next";
import { FC } from "react";

import { Section } from "@/components/dashboard/section";

export const metadata: Metadata = {
  title: "Akun Game - Erika Store",
  description: "Manage games in your store",
};

const Page: FC = () => {
  return (
    <Section name="Akun Game">
      <h1>ini ntar tabelnya</h1>
    </Section>
  );
};

export default Page;
