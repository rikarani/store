import { FC } from "react";
import type { Metadata } from "next";

import { PrismaClient } from "@prisma/client";

import { Game } from "@/components/dashboard/manage-game/game";
import { DashboardLayout } from "@/layouts/dashboard";

export const metadata: Metadata = {
  title: "Manage Game - Erika Store",
  description: "Manage games in your store",
};

const prisma = new PrismaClient();

const Page: FC = async () => {
  const games = await prisma.game.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <DashboardLayout name="Manage Game">
      <Game games={games} />
    </DashboardLayout>
  );
};

export default Page;
