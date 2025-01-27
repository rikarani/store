import { FC } from "react";

import { AuthSection } from "@/components/auth/auth-section";
import { ForgotPassword } from "@/components/auth/forgot-password";

const Page: FC = async () => {
  return (
    <AuthSection title="Lupa Password" subtitle="yaelah password sendiri aja lupa">
      <ForgotPassword />
    </AuthSection>
  );
};

export default Page;
