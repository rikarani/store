import type { Metadata } from "next";
import { FC } from "react";

import { Section } from "@/components/dashboard/section";

export const metadata: Metadata = {
  title: "Profile - Erika Store",
  description: "Your Account",
};

const Page: FC = () => {
  return (
    <Section name="Profile">
      <h1>ini ntar tabelnya</h1>
    </Section>
  );
};

export default Page;
