"use client";

import { FC } from "react";
import Link from "next/link";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";

import { Icon } from "@iconify-icon/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Login: FC = () => {
  const [ref] = useAutoAnimate();

  return (
    <SignIn.Root>
      <div className="h-full lg:grid lg:place-items-center">
        <SignIn.Step name="start" className="w-full max-w-screen-md px-6 py-3">
          <div className="w-full">
            <p className="text-xl font-semibold">Loginkan</p>
            <p className="text-sm font-medium text-default-500">untuk menikmati kemudahan yang ada</p>
          </div>
          <div className="py-3">
            <Divider />
          </div>
          <div className="space-y-3">
            <Clerk.Loading scope="provider:google">
              {(loading) => (
                <Clerk.Connection asChild name="google">
                  <Button
                    isLoading={loading}
                    className="w-full"
                    startContent={loading ? null : <Icon icon="flat-color-icons:google" width={24} />}
                    variant="bordered"
                  >
                    Login Pake Google
                  </Button>
                </Clerk.Connection>
              )}
            </Clerk.Loading>
            <Clerk.Loading scope="provider:facebook">
              {(loading) => (
                <Clerk.Connection asChild name="facebook">
                  <Button
                    isLoading={loading}
                    className="w-full"
                    startContent={loading ? null : <Icon icon="logos:facebook" width={24} />}
                    variant="bordered"
                  >
                    Login Pake Fesbuk
                  </Button>
                </Clerk.Connection>
              )}
            </Clerk.Loading>
            <Clerk.Loading scope="provider:github">
              {(loading) => (
                <Clerk.Connection asChild name="github">
                  <Button
                    isLoading={loading}
                    className="w-full"
                    startContent={loading ? null : <Icon icon="fe:github" width={24} />}
                    variant="bordered"
                  >
                    Login Pake GitHub
                  </Button>
                </Clerk.Connection>
              )}
            </Clerk.Loading>
          </div>
          <div className="flex items-center gap-4 py-3">
            <Divider className="flex-1" />
            <p className="shrink-0 text-tiny text-default-500">ATAU</p>
            <Divider className="flex-1" />
          </div>
          <div className="space-y-3">
            <Clerk.Field name="identifier">
              <Clerk.Loading scope="step:start">
                {(loading) => (
                  <Clerk.Input asChild>
                    <Input isDisabled={loading} label="Username" isRequired className="w-full" variant="bordered" />
                  </Clerk.Input>
                )}
              </Clerk.Loading>
              <div ref={ref}>
                <Clerk.FieldError asChild>
                  {({ message }) => <span className="pl-1 text-sm text-red-600 dark:text-red-500">{message}</span>}
                </Clerk.FieldError>
              </div>
            </Clerk.Field>
            <Clerk.Field name="password">
              <Clerk.Loading scope="step:start">
                {(loading) => (
                  <Clerk.Input asChild type="password" validatePassword>
                    <Input isDisabled={loading} label="Password" isRequired className="w-full" variant="bordered" />
                  </Clerk.Input>
                )}
              </Clerk.Loading>
              <div ref={ref}>
                <Clerk.FieldError>
                  {({ message }) => <span className="pl-1 text-sm text-red-600 dark:text-red-500">{message}</span>}
                </Clerk.FieldError>
              </div>
            </Clerk.Field>
            <Clerk.Loading scope="step:start">
              {(loading) => (
                <SignIn.Action submit asChild>
                  <Button isLoading={loading} className="w-full" color="primary">
                    Login
                  </Button>
                </SignIn.Action>
              )}
            </Clerk.Loading>
          </div>
          <h6 className="mt-3 text-right text-sm">
            Belum Punya Akun?{" "}
            <Clerk.Link navigate="sign-up">
              {({ url }) => (
                <Link href={url} className="text-primary">
                  Daftar
                </Link>
              )}
            </Clerk.Link>
          </h6>
        </SignIn.Step>
        <SignIn.Step name="sso-callback">
          <div className="grid size-full place-items-center">
            <Spinner size="lg" />
            <AuthenticateWithRedirectCallback continueSignUpUrl="/register/continue" />
          </div>
        </SignIn.Step>
      </div>
    </SignIn.Root>
  );
};
