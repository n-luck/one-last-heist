"use server";

import prisma from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import z from "zod";
import { insertCampaignSchema } from "../validators";
import { revalidatePath } from "next/cache";

export async function getAllCampaigns() {
  const data = await prisma.campaign.findMany({
    orderBy: { name: "asc" },
  });

  return convertToPlainObject(data);
}

export async function createCampaign(
  data: z.infer<typeof insertCampaignSchema>
) {
  try {
    const campaign = insertCampaignSchema.parse(data);

    await prisma.campaign.create({
      data: campaign,
    });

    revalidatePath("/campaigns");

    return { success: true, message: "Campaign was created successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}