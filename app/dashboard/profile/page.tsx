import type { Metadata } from "next";
import { FC } from "react";

import { DashboardLayout } from "@/layouts/dashboard";

export const metadata: Metadata = {
  title: "Profile - Erika Store",
  description: "Your Account",
};

const Page: FC = () => {
  return (
    <DashboardLayout name="Profile">
      <h1>wip</h1>
    </DashboardLayout>
  );
};

export default Page;
