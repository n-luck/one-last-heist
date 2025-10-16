"use server";

import { CHARACTER_LIMIT } from "../constants";
import { PrismaClient } from "../generated/prisma";
import { convertToPlainObject } from "../utils";

export async function getLatestCharacters() {
  const prisma = new PrismaClient();

  const data = await prisma.character.findMany({
    take: CHARACTER_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}
