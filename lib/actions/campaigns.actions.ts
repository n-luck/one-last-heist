"use server";

import prisma from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import z from "zod";
import { insertCampaignSchema, updateCampaignSchema } from "../validators";
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

export async function updateCampaign(
  data: z.infer<typeof updateCampaignSchema>
) {
  try {
    const campaign = updateCampaignSchema.parse(data);
    const campaignExists = await getCampaignById(campaign.id);

    if (!campaignExists) throw new Error("Campaign not found.");

    await prisma.campaign.update({
      where: {
        id: campaign.id,
      },
      data: campaign,
    });

    const campaignNameUpdate = campaignExists.name !== campaign.name;
    if (campaignNameUpdate) {
      await prisma.character.updateMany({
        where: { campaign: campaignExists.name },
        data: { campaign: campaign.name },
      });
    }

    revalidatePath("/campaigns");

    return { success: true, message: "Campaign was updated successfully." };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function getCampaignBySlug(slug: string) {
  return await prisma.campaign.findFirst({
    where: {
      slug: slug,
    },
  });
}

export async function getCampaignById(id: string) {
  return await prisma.campaign.findFirst({
    where: {
      id: id,
    },
  });
}
