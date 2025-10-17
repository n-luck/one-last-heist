import { PrismaClient } from "@/lib/generated/prisma";
import sampleData from "./sample-data";

async function main() {
  const prisma = new PrismaClient();

  await prisma.character.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.verificationToken.deleteMany();

  await prisma.character.createMany({ data: sampleData.characters });
  await prisma.user.createMany({ data: sampleData.users });

  console.log("Database seeded successfully.");
}

main();
