"use server";

import { PrismaClient } from "@prisma/client";

import { Response } from "@/types";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function deleteField(id: string): Promise<Response> {
  try {
    await prisma.field.delete({
      where: { id },
    });
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      message: `Gagal menghapus field : ${error.message}`,
    };
  }

  revalidatePath("/dashboard/admin/manage-game/[id]", "page");

  return {
    success: true,
    message: "Berhasil menghapus field",
  };
}
