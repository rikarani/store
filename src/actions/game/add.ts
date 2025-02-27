"use server";

import { Response } from "@/types";
import { PrismaClient } from "@prisma/client";
import { revalidateTag, revalidatePath } from "next/cache";

import type { GameFromAPI } from "@/types/game";

const prisma = new PrismaClient();

export async function addGame(game: Partial<GameFromAPI>): Promise<Response> {
  try {
    await prisma.game.create({
      data: {
        name: game?.name as string,
        code: game?.code as string,
        thumbnail: game?.icon_url as string,
      },
    });
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      message: `Gagal Menambahkan Game : ${error.message}`,
    };
  }

  revalidateTag("available game");

  revalidatePath("/");
  revalidatePath("/dashboard/admin/manage-game");

  return {
    success: true,
    message: "Game Berhasil Ditambahkan",
  };
}
