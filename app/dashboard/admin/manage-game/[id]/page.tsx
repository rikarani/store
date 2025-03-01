import { FC } from "react";
import type { Metadata } from "next";

import { PrismaClient } from "@prisma/client";
import type { EnhancedGame } from "@/types";
import { EditGame } from "@/components/dashboard/manage-game/edit-game";
import { DashboardLayout } from "@/layouts/dashboard";

type Props = {
  params: Promise<{ id: string }>;
};

const prisma = new PrismaClient();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = await prisma.game.findUnique({
    where: {
      id: (await params).id,
    },
  });

  return {
    title: `Edit Game ${game?.name} - Erika Store`,
    description: `Edit Game ${game?.name}`,
  };
}

const Page: FC<Props> = async ({ params }) => {
  const game: EnhancedGame | null = await prisma.game.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      fields: true,
      servers: true,
    },
  });

  return (
    <DashboardLayout name={`Manage Game - ${game?.name || "mak lemak lemak"}`}>
      <EditGame game={game} />
    </DashboardLayout>
  );
};

export default Page;
