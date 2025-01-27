"use client";

import { FC, useState } from "react";

import { OAuthStrategy } from "@clerk/types";
import { useSignIn, useSignUp } from "@clerk/nextjs";

import { Button } from "@heroui/button";
import { Icon } from "@iconify-icon/react";

type SocialLogin = {
  provider: OAuthStrategy;
  icon: React.ReactNode;
  label: string;
};

export const SocialLogin: FC = () => {
  const [loading, setLoading] = useState<string | undefined>(undefined);
  const providers: SocialLogin[] = [
    {
      provider: "oauth_google",
      icon: <Icon icon="flat-color-icons:google" width={24} />,
      label: "Login pake Google",
    },
    {
      provider: "oauth_facebook",
      icon: <Icon icon="logos:facebook" width={24} />,
      label: "Login pake Fesbuk",
    },
    {
      provider: "oauth_github",
      icon: <Icon icon="fe:github" width={24} />,
      label: "Login pake Github",
    },
  ];

  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const loginWith = (strategy: OAuthStrategy) => {
    setLoading(strategy);

    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/auth/callback",
      redirectUrlComplete: "/dashboard/riwayat-transaksi",
    });
  };

  const handleSignIn = async (strategy: OAuthStrategy) => {
    const transferable = signUp?.verifications.externalAccount.status === "transferable";
    const externalAccountExists = signUp?.verifications.externalAccount.error?.code === "external_account_exists";

    const userExistsButNeedsToSignIn = transferable && externalAccountExists;

    if (userExistsButNeedsToSignIn) {
      const res = await signIn?.create({ transfer: true });

      if (res?.status === "complete") {
        setActive!({
          session: res.createdSessionId,
        });
      }
    }

    const userNeedsToBeCreated = signIn?.firstFactorVerification.status === "transferable";

    if (userNeedsToBeCreated) {
      const res = await signUp?.create({ transfer: true });

      if (res?.status === "complete") {
        setActive!({
          session: res.createdSessionId,
        });
      }
    } else {
      loginWith(strategy);
    }
  };

  return (
    <div className="space-y-3 lg:flex lg:gap-3 lg:space-y-0">
      {providers.map(({ provider, icon, label }) => (
        <Button
          key={provider}
          isLoading={loading === provider}
          isDisabled={loading !== undefined}
          onPress={() => handleSignIn(provider)}
          className="w-full"
          startContent={loading === provider ? null : icon}
          variant="bordered"
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
