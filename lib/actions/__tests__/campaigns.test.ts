import { revalidatePath } from "next/cache";

import prisma from "@/db/prisma";
import { Campaign } from "@/types";

import {
  createCampaign,
  getAllCampaigns,
  getCampaignBySlug,
} from "../campaigns.actions";
import { convertToPlainObject } from "@/lib/utils";
import { campaignData } from "@/lib/constants/mocks";

jest.mock("@/db/prisma", () => ({
  campaign: {
    create: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
  },
}));

jest.mock("@/lib/utils", () => ({
  convertToPlainObject: jest.fn((data) => data),
  formatError: jest.fn((data) => data),
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

describe("Campaign actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getAllCampaigns returns all campaigns sorted alpabetically by name", async () => {
    const mockData = [
      { id: 1, name: "Wooster" },
      { id: 2, name: "Jeeves" },
    ];

    (prisma.campaign.findMany as jest.Mock).mockResolvedValue(mockData);

    const result = await getAllCampaigns();

    expect(prisma.campaign.findMany).toHaveBeenCalledWith({
      orderBy: { name: "asc" },
    });
    expect(convertToPlainObject).toHaveBeenCalledWith(mockData);
    expect(result).toEqual(mockData);
  });

  it("createCampaign creates a campaign and revalidates path", async () => {
    (prisma.campaign.create as jest.Mock).mockResolvedValue(campaignData);

    const result = await createCampaign({
      name: "Test",
      slug: "test",
      players: ["Test1", "Test2"],
      image: null,
      notes: null,
      gameMaster: "Test",
    });

    expect(prisma.campaign.create).toHaveBeenCalledWith({
      data: campaignData,
    });
    expect(revalidatePath).toHaveBeenCalledWith("/campaigns");
    expect(result.success).toBe(true);
  });

  it("createCampaign returns an error when validation fails", async () => {
    const result = await createCampaign({ name: "", slug: "" } as Campaign);
    expect(result.success).toBe(false);
    expect(result.message).toBeDefined();
  });

  it("getCampaignBySlug returns a campaign for the given slug", async () => {
    const mockCampaign = { id: 1, name: "Test", slug: "test-slug" };

    (prisma.campaign.findFirst as jest.Mock).mockResolvedValue(mockCampaign);

    const result = await getCampaignBySlug("test-slug");

    expect(prisma.campaign.findFirst).toHaveBeenCalledWith({
      where: { slug: "test-slug" },
    });
    expect(result).toEqual(mockCampaign);
  });
});
