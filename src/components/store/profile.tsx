"use client";

import { FC } from "react";

import { Icon } from "@iconify-icon/react";
import { useClerk } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";

import { Avatar } from "@heroui/avatar";
import { User } from "@heroui/user";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@heroui/dropdown";

type Props = {
  user: UserResource | null | undefined;
};

export const Profile: FC<Props> = ({ user }) => {
  const { signOut } = useClerk();

  return (
    <Dropdown placement="bottom-end" backdrop="opaque">
      <DropdownTrigger>
        <Avatar src={user?.imageUrl} as="button" size="sm" />
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownItem
          textValue="Profile"
          key="profile"
          as="div"
          className="cursor-auto data-[hover=true]:bg-transparent"
        >
          <User avatarProps={{ src: user?.imageUrl }} description={user?.username} name={user?.fullName} />
        </DropdownItem>
        <DropdownSection title="General" showDivider>
          <DropdownItem
            textValue="edit profile"
            key="edit profile"
            endContent={<Icon icon="uil:user" className="text-base" />}
          >
            Edit Profile
          </DropdownItem>
          <DropdownItem textValue="history" key="history" endContent={<Icon icon="uil:wallet" className="text-base" />}>
            Riwayat Transaksi
          </DropdownItem>
          <DropdownItem
            textValue="game accounts"
            key="game accounts"
            endContent={<Icon icon="lucide:gamepad-2" className="text-base" />}
          >
            Manage Akun Game
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Khusus Admin" showDivider>
          <DropdownItem textValue="manage user" key="manage user">
            Manage User
          </DropdownItem>
          <DropdownItem textValue="manage game" key="manage game">
            Manage Game
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger Zone">
          <DropdownItem
            onPress={() => signOut({ redirectUrl: "/" })}
            className="text-danger"
            color="danger"
            key="logout"
            endContent={<Icon icon="lucide:log-out" className="text-base" />}
          >
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
