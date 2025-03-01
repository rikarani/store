import type { Metadata } from "next";
import { FC, Suspense } from "react";

import { PrismaClient, Game } from "@prisma/client";

import { Loading } from "@/components/ui/loading";
import { AddGameTable } from "@/components/dashboard/manage-game/add-game";
import { DashboardLayout } from "@/layouts/dashboard";
import { type GameFromAPI } from "@/types/game";

export const metadata: Metadata = {
  title: "Tambah Game Baru - Erika Store",
  description: "Manage games in your store",
};

const prisma = new PrismaClient();

const Page: FC = async () => {
  const hit = await fetch(`${process.env.WENDIGG_BASE_URL}/provider`, {
    headers: {
      Authorization: `Bearer ${process.env.WENDIGG_API_KEY}`,
    },
    next: {
      revalidate: 3600,
      tags: ["available games"],
    },
  });

  const dbGame: Game[] = await prisma.game.findMany();
  const apiGame: GameFromAPI[] = (await hit.json())?.data || [];

  const games = apiGame.filter((game) => !dbGame.find((g) => g.code === game.code));

  return (
    <DashboardLayout name="Tambah Game Baru">
      <Suspense fallback={<Loading />}>
        <AddGameTable games={games} />
      </Suspense>
    </DashboardLayout>
  );
};

export default Page;
