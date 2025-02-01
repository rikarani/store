import { FC } from "react";
import type { Metadata } from "next";

import { DashboardSection } from "@/components/dashboard/dashboard-section";

export const metadata: Metadata = {
  title: "Manage Game - Erika Store",
  description: "Manage games in your store",
};

const Page: FC = async () => {
  return (
    <DashboardSection name="Manage Game">
      <h1>wip</h1>
    </DashboardSection>
  );
};

export default Page;
