"use server";

import prisma from "@/db/prisma";
import { CHARACTER_LIMIT } from "../constants";
import { convertToPlainObject } from "../utils";

export async function getLatestCharacters() {
  const data = await prisma.character.findMany({
    take: CHARACTER_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return convertToPlainObject(data);
}
