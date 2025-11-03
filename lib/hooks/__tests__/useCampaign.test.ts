import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { useCampaigns } from "../useCampaigns";
import * as campaignsActions from "@/lib/actions/campaigns.actions";

jest.mock("@/lib/actions/campaigns.actions");
jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

describe("useCampaigns hook", () => {
  it("fetches campaigns and sets values", async () => {
    (campaignsActions.getAllCampaigns as jest.Mock).mockResolvedValue([
      { name: "Campaign A" },
      { name: "Campaign B" },
    ]);
    const { result } = renderHook(() => useCampaigns());

    await waitFor(() => {
      expect(result.current).toEqual([
        { label: "Campaign A", value: "Campaign A" },
        { label: "Campaign B", value: "Campaign B" },
      ]);
    });
  });
});
