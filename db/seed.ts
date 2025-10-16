import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  await prisma.character.deleteMany();

  await prisma.character.createMany({ data: sampleData.characters });

  console.log("Database seeded successfully.")
}

main();
