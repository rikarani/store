import { FC } from "react";
import type { Metadata } from "next";

import { DashboardSection } from "@/components/dashboard/dashboard-section";

export const metadata: Metadata = {
  title: "Manage Member - Erika Store",
  description: "buat ngeliat",
};

const Page: FC = () => {
  return (
    <DashboardSection name="Manage Member">
      <h1>wip</h1>
    </DashboardSection>
  );
};

export default Page;
