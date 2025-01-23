"use client";

import { FC } from "react";
import Link from "next/link";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";

import { useAutoAnimate } from "@formkit/auto-animate/react";

export const Register: FC = () => {
  const [ref] = useAutoAnimate();

  return (
    <SignUp.Root>
      <div className="h-full lg:grid lg:place-items-center">
        <SignUp.Step name="start" className="w-full max-w-screen-md px-6 py-3">
          <div className="w-full">
            <p className="text-xl font-semibold">Daftar</p>
            <p className="text-sm font-medium text-default-500">soalnye kau blom punye akun</p>
          </div>
          <div className="py-3">
            <Divider />
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <Clerk.Field name="firstName">
                <Clerk.Loading scope="step:start">
                  {(loading) => (
                    <Clerk.Input asChild>
                      <Input isDisabled={loading} label="Nama Depan" isRequired className="w-full" variant="bordered" />
                    </Clerk.Input>
                  )}
                </Clerk.Loading>
                <div ref={ref}>
                  <Clerk.FieldError asChild>
                    {({ message }) => <span className="pl-1 text-sm text-red-600 dark:text-red-500">{message}</span>}
                  </Clerk.FieldError>
                </div>
              </Clerk.Field>
              <Clerk.Field name="lastName">
                <Clerk.Loading scope="step:start">
                  {(loading) => (
                    <Clerk.Input asChild>
                      <Input
                        isDisabled={loading}
                        label="Nama Belakang"
                        isRequired
                        className="w-full"
                        variant="bordered"
                      />
                    </Clerk.Input>
                  )}
                </Clerk.Loading>
                <div ref={ref}>
                  <Clerk.FieldError asChild>
                    {({ message }) => <span className="pl-1 text-sm text-red-600 dark:text-red-500">{message}</span>}
                  </Clerk.FieldError>
                </div>
              </Clerk.Field>
            </div>
            <Clerk.Field name="username">
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
                <SignUp.Action submit asChild>
                  <Button isLoading={loading} className="w-full" color="primary">
                    Daftar
                  </Button>
                </SignUp.Action>
              )}
            </Clerk.Loading>
          </div>
          <h6 className="mt-3 text-right text-sm">
            Udah Punya Akun?{" "}
            <Clerk.Link navigate="sign-in">
              {({ url }) => (
                <Link href={url} className="text-primary">
                  Login
                </Link>
              )}
            </Clerk.Link>
          </h6>
        </SignUp.Step>
        <SignUp.Step name="continue" className="w-full max-w-screen-md px-6 py-3">
          <div className="w-full">
            <p className="text-xl font-semibold">Selamat Datang</p>
            <p className="text-sm font-medium text-default-500">isi dulu yang dibutuhkan</p>
          </div>
          <div className="py-3">
            <Divider />
          </div>
          <div className="space-y-3">
            <Clerk.Field name="username">
              <Clerk.Loading scope="step:continue">
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
            <Clerk.Loading scope="step:continue">
              {(loading) => (
                <SignUp.Action submit asChild>
                  <Button isLoading={loading} className="w-full" color="primary">
                    Lanjut
                  </Button>
                </SignUp.Action>
              )}
            </Clerk.Loading>
          </div>
        </SignUp.Step>
      </div>
    </SignUp.Root>
  );
};
