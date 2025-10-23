"use server";

import prisma from "@/db/prisma";
import { CHARACTER_LIMIT } from "../constants";
import { convertToPlainObject, formatError } from "../utils";

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

export async function updateCharacter( id: string, newName: string ) {
  try {
    const currentCharacter = await getCharactersById(id)

    if (!currentCharacter) throw new Error("User not found.");

    await prisma.character.update({
      where: {
        id: currentCharacter.id,
      },
      data: {
        name: newName,
      },
    });

    return { success: true, message: "Character updated successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
