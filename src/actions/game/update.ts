"use server";

import { revalidatePath } from "next/cache";
import { PrismaClient, Game } from "@prisma/client";
import { MutateGameState as State } from "@/types";

const prisma = new PrismaClient();

export async function updateGame(game: Partial<Game>): Promise<State> {
  try {
    await prisma.game.update({
      data: { ...game },
      where: {
        id: game?.id as string,
      },
    });
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/admin/manage-game");

  return {
    success: true,
    message: "Berhasil",
  };
}
