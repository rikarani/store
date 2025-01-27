import { FC } from "react";
import type { Metadata } from "next";

import { Divider } from "@heroui/divider";

import { AuthSection } from "@/components/auth/auth-section";
import { SocialLogin } from "@/components/auth/social-login";
import { CredentialsLogin } from "@/components/auth/credentials-login";

export const metadata: Metadata = {
  title: "Login - Erika Store",
  description: "Login to your account to continue shopping",
};

const Page: FC = () => {
  return (
    <AuthSection title="Loginkan" subtitle="aku bingung nak nulis ape">
      <SocialLogin />
      <div className="flex items-center gap-4 py-4">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">ATAU</p>
        <Divider className="flex-1" />
      </div>
      <CredentialsLogin />
    </AuthSection>
  );
};

export default Page;
