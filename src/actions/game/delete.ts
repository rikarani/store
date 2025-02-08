"use server";

import { MutateGameState as State } from "@/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export async function deleteGame(_previous: State | undefined, payload: FormData): Promise<State | undefined> {
  const id = payload.get("id");

  try {
    await prisma.game.delete({
      where: {
        id: id as string,
      },
    });

    revalidateTag("game dari api");
    revalidatePath("/dashboard/admin/manage-game");

    return {
      success: true,
      message: "Game berhasil ditambahkan",
    };
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      message: error.message,
    };
  }
}
