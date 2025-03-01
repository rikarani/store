import { FC } from "react";
import type { Metadata } from "next";

import { PrismaClient } from "@prisma/client";

import { DashboardLayout } from "@/layouts/dashboard";
import { GameTable } from "@/components/dashboard/manage-game/game";

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
      <GameTable data={games} />
    </DashboardLayout>
  );
};

export default Page;
