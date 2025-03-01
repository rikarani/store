import { FC } from "react";

import { AuthLayout } from "@/layouts/auth";
import { ForgotPassword } from "@/components/auth/forgot-password";

const Page: FC = async () => {
  return (
    <AuthLayout title="Lupa Password" subtitle="yaelah password sendiri aja lupa">
      <ForgotPassword />
    </AuthLayout>
  );
};

export default Page;
