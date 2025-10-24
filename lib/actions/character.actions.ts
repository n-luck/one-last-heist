"use server";

import prisma from "@/db/prisma";
import { CHARACTER_LIMIT } from "../constants";
import { convertToPlainObject, formatError } from "../utils";
import z from "zod";
import { insertCharacterSchema, updateCharacterSchema } from "../validators";
import { revalidatePath } from "next/cache";

export async function getLatestCharacters() {
  const data = await prisma.character.findMany({
    take: CHARACTER_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}

export async function getCharacterBySlug(slug: string) {
  return await prisma.character.findFirst({
    where: {
      slug: slug,
    },
  });
}

export async function getCharactersByPlayer(player: string) {
  return await prisma.character.findMany({
    where: {
      player: player,
    },
  });
}

export async function getCharactersById(id: string) {
  return await prisma.character.findFirst({
    where: {
      id: id,
    },
  });
}

export async function createCharacter(
  data: z.infer<typeof insertCharacterSchema>
) {
  try {
    const character = insertCharacterSchema.parse(data);

    await prisma.character.create({
      data: character,
    });

    revalidatePath("/user");

    return { success: true, message: "Character was created successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function updateCharacter(
  data: z.infer<typeof updateCharacterSchema>
) {
  try {
    const character = updateCharacterSchema.parse(data);
    const characterExists = await prisma.character.findFirst({
      where: {
        id: character.id,
      },
    });

    if (!characterExists) throw new Error("Character not found.");

    await prisma.character.update({
      where: {
        id: character.id,
      },
      data: character,
    });

    revalidatePath("/user");

    return { success: true, message: "Character was updated successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
