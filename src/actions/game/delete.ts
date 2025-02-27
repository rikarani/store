"use server";

import { Response } from "@/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export async function deleteGame(id: string): Promise<Response> {
  try {
    await prisma.game.delete({
      where: { id },
    });
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      message: `Gagal Menghapus Game : ${error.message}`,
    };
  }

  revalidateTag("available game");

  revalidatePath("/");
  revalidatePath("/dashboard/admin/manage-game");

  return {
    success: true,
    message: "Game berhasil dihapus",
  };
}
