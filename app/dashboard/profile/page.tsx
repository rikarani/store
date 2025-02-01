import type { Metadata } from "next";
import { FC } from "react";

import { DashboardSection } from "@/components/dashboard/dashboard-section";

export const metadata: Metadata = {
  title: "Profile - Erika Store",
  description: "Your Account",
};

const Page: FC = () => {
  return (
    <DashboardSection name="Profile">
      <h1>wip</h1>
    </DashboardSection>
  );
};

export default Page;
