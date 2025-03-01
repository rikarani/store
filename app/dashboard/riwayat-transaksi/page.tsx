import { FC } from "react";
import type { Metadata } from "next";

import { DashboardLayout } from "@/layouts/dashboard";

export const metadata: Metadata = {
  title: "Riwayat Transaksi - Erika Store",
  description: "buat ngeliat",
};

const Page: FC = () => {
  return (
    <DashboardLayout name="Riwayat Transaksi">
      <h1>wip</h1>
    </DashboardLayout>
  );
};

export default Page;
