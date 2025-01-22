import { FC, Suspense } from "react";
import type { Metadata } from "next";

import { PrismaClient } from "@prisma/client";
import { Section } from "@/components/dashboard/section";
import { Game } from "@/components/dashboard/manage-game/game";

export const metadata: Metadata = {
  title: "Manage Game - Erika Store",
  description: "Manage games in your store",
};

const prisma = new PrismaClient();

const Page: FC = async () => {
  const games = await prisma.game.findMany();

  return (
    <Section name="Manage Game">
      <Suspense fallback={<h1>Loading...</h1>}>
        <Game games={games} />
      </Suspense>
    </Section>
  );
};

export default Page;
