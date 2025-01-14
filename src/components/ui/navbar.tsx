import { FC } from "react";
import Link from "next/link";

import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";

import { Brand } from "@/components/icons";
import { Profile } from "./profile";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

import { Button } from "@nextui-org/button";
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";

export const Navbar: FC = () => {
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
          <SignedOut>
            <SignInButton>
              <Button color="primary" size="sm" variant="solid">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Profile />
          </SignedIn>
        </NavbarItem>
      </NavbarContent>
    </Nav>
  );
};
