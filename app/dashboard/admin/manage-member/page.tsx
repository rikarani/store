import { FC } from "react";
import type { Metadata } from "next";

import { Section } from "@/components/dashboard/section";

export const metadata: Metadata = {
  title: "Manage Member - Erika Store",
  description: "buat ngeliat",
};

const Page: FC = () => {
  return (
    <div className="mx-auto max-w-screen-lg">
      <Section name="Manage Member">
        <h1>ini manage member</h1>
      </Section>
    </div>
  );
};

export default Page;
