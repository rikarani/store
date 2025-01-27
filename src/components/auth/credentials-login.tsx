"use client";

import { FC } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

import Link from "next/link";

export const CredentialsLogin: FC = () => {
  const [ref] = useAutoAnimate();

  return (
    <SignIn.Root>
      <SignIn.Step name="start" className="space-y-3">
        <div className="w-full space-y-3 lg:flex lg:gap-3 lg:space-y-0">
          <Clerk.Field name="identifier" className="flex-1">
            <Clerk.Loading scope="step:start">
              {(loading) => (
                <Clerk.Input asChild>
                  <Input isDisabled={loading} label="Username" isRequired variant="bordered" />
                </Clerk.Input>
              )}
            </Clerk.Loading>
            <div ref={ref}>
              <Clerk.FieldError asChild>
                {({ message }) => <span className="pl-1 text-sm text-red-600 dark:text-red-500">{message}</span>}
              </Clerk.FieldError>
            </div>
          </Clerk.Field>
          <Clerk.Field name="password" className="flex-1">
            <Clerk.Loading scope="step:start">
              {(loading) => (
                <Clerk.Input asChild type="password" validatePassword>
                  <Input isDisabled={loading} label="Password" isRequired variant="bordered" />
                </Clerk.Input>
              )}
            </Clerk.Loading>
            <div ref={ref}>
              <Clerk.FieldError>
                {({ message }) => <span className="pl-1 text-sm text-red-600 dark:text-red-500">{message}</span>}
              </Clerk.FieldError>
            </div>
          </Clerk.Field>
        </div>
        <div className="flex w-full items-center justify-end">
          <Link href="/auth/forgot-password" className="text-sm">
            Lupa Password?
          </Link>
        </div>
        <Clerk.Loading scope="step:start">
          {(loading) => (
            <SignIn.Action submit asChild>
              <Button isLoading={loading} className="w-full" color="primary">
                Login
              </Button>
            </SignIn.Action>
          )}
        </Clerk.Loading>
      </SignIn.Step>
    </SignIn.Root>
  );
};
