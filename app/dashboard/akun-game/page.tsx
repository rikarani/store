import type { Metadata } from "next";
import { FC } from "react";

import { DashboardSection } from "@/components/dashboard/dashboard-section";

export const metadata: Metadata = {
  title: "Akun Game - Erika Store",
  description: "Manage games in your store",
};

const Page: FC = () => {
  return (
    <DashboardSection name="Akun Game">
      <h1>wip</h1>
    </DashboardSection>
  );
};

export default Page;
