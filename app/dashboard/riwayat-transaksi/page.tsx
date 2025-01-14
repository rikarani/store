import { FC } from "react";
import type { Metadata } from "next";

import { Section } from "@/components/dashboard/section";

export const metadata: Metadata = {
  title: "Riwayat Transaksi - Erika Store",
  description: "buat ngeliat",
};

const Page: FC = () => {
  return (
    <Section name="Riwayat Transaksi">
      <h1>ini ntar tabelnya</h1>
    </Section>
  );
};

export default Page;
