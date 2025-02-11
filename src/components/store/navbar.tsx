"use client";

import { FC } from "react";
import Link from "next/link";

import { SignedOut, SignedIn, SignInButton, useUser, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

import { Profile } from "./profile";
import { Brand } from "@/icons";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";

import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

export const Navbar: FC = () => {
  const { user } = useUser();

  return (
    <Nav>
      <NavbarBrand as={Link} href="/" className="max-w-max">
        <Brand size={36} />
        <p className="hidden font-bold text-inherit lg:block">Erika Store</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ClerkLoading>
            <Skeleton className="size-8 rounded-full" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton>
                <Button color="primary" size="sm" variant="solid">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Profile user={user} />
            </SignedIn>
          </ClerkLoaded>
        </NavbarItem>
      </NavbarContent>
    </Nav>
  );
};
