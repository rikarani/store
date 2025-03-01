"use server";

import { Response } from "@/types";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { UpdateGameSchema as Game, updateGameSchema as schema } from "@/schemas/game/update";

export async function updateGame(game: Game): Promise<Response> {
  const { id, ...data } = schema.parse(game);

  try {
    await prisma.game.update({
      data: { ...data },
      where: { id },
    });
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      message: `Gagal memperbarui game: ${error.message}`,
    };
  }

  revalidatePath("/");
  revalidatePath("/dashboard/admin/manage-game");

  return {
    success: true,
    message: "Berhasil memperbarui game",
  };
}
