import type { Metadata } from "next";
import { FC, Suspense } from "react";

import { PrismaClient } from "@prisma/client";
import { Spinner } from "@heroui/spinner";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { AddGame } from "@/components/dashboard/manage-game/add-game";

export const metadata: Metadata = {
  title: "Tambah Game Baru - Erika Store",
  description: "Manage games in your store",
};

const prisma = new PrismaClient();

const Loading: FC = () => {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <Spinner label="sabar ye" />
    </div>
  );
};

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

  const games = await prisma.game.findMany();
  const allGames = await hit.json();

  return (
    <DashboardSection name="Tambah Game Baru">
      <Suspense fallback={<Loading />}>
        <AddGame label="Tambah Game Baru" gamesFromDB={games} gamesFromAPI={allGames?.data || []} />
      </Suspense>
    </DashboardSection>
  );
};

export default Page;
