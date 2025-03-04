"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { type Response } from "@/types";
import { addFieldSchema, type AddFieldSchema } from "@/schemas/field/add";

const prisma = new PrismaClient();

export async function addField(data: AddFieldSchema): Promise<Response> {
  try {
    const { game_id, ...field } = addFieldSchema.parse(data);

    await prisma.field.create({
      data: {
        game_id,
        ...field,
      },
    });
  } catch (e) {
    const error = e as Error;

    return {
      success: false,
      message: `Gagal menambah field: ${error.message}`,
    };
  }

  revalidatePath("/dashboard/admin/manage-game/[id]", "page");

  return {
    success: true,
    message: "Field berhasil ditambahkan",
  };
}
