"use server";

import { revalidateTag } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { State } from "@/components/dashboard/manage-game/add-game";

const prisma = new PrismaClient();

export async function addGame(_previous: State | undefined, formData: FormData): Promise<State | undefined> {
  const name = formData.get("name");
  const code = formData.get("code");

  try {
    await prisma.game.create({
      data: {
        name: name as string,
        code: code as string,
      },
    });

    revalidateTag("game dari api");

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
