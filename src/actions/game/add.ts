"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag, revalidatePath } from "next/cache";
import { State } from "@/components/dashboard/manage-game/add-game";

const prisma = new PrismaClient();

export async function addGame(_previous: State | undefined, payload: FormData): Promise<State | undefined> {
  const name = payload.get("name");
  const code = payload.get("code");
  const thumbnail = payload.get("thumbnail");

  try {
    await prisma.game.create({
      data: {
        name: name as string,
        code: code as string,
        thumbnail: thumbnail as string,
      },
    });

    revalidateTag("available games");

    revalidatePath("/");
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
