import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CampaignForm, CampaignFormProps } from "../CampaignForm";
import { createCampaign } from "@/lib/actions/campaigns.actions";
import { toast } from "sonner";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/lib/actions/campaigns.actions", () => ({
  createCampaign: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("slugify", () => ({
  __esModule: true,
  default: (str: string) => str.toLowerCase().replace(/\s+/g, "-"),
}));

jest.mock("@uploadthing/react", () => ({
  generateUploadButton: jest.fn(
    () =>
      function MockUploadButton() {
        return <div>Upload Button</div>;
      }
  ),
  generateUploadDropzone: jest.fn(
    () =>
      function MockUploadDropzone() {
        return <div>Upload Dropzone</div>;
      }
  ),
}));

describe("CampaignForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps: CampaignFormProps = { type: "create", players: [] };

  it("renders form fields", () => {
    render(<CampaignForm {...defaultProps} />);
    expect(screen.getByLabelText("Campaign name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Campaign slug (URL)*")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("generates a slug from name when clicking 'Generate' button", () => {
    render(<CampaignForm {...defaultProps} />);
    const nameInput = screen.getByLabelText(
      "Campaign name*"
    ) as HTMLInputElement;
    const slugInput = screen.getByLabelText(
      "Campaign slug (URL)*"
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Test Campaign" } });
    fireEvent.click(screen.getByText("Generate"));

    expect(slugInput.value).toBe("test-campaign");
  });

  it("shows validation errors when required fields are empty", async () => {
    render(<CampaignForm {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: /create campaign/i }));

    expect(
      await screen.findByText(/Name must be at least 3 characters./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Slug must be at least 3 characters./i)
    ).toBeInTheDocument();
  });

  it("submits the form successfully and navigates", async () => {
    (createCampaign as jest.Mock).mockResolvedValue({
      success: true,
      message: "Campaign created!",
    });
    render(<CampaignForm {...defaultProps} />);

    const nameInput = screen.getByLabelText(
      "Campaign name*"
    ) as HTMLInputElement;
    const slugInput = screen.getByLabelText(
      "Campaign slug (URL)*"
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Test Campaign" } });
    fireEvent.change(slugInput, { target: { value: "test-campaign" } });
    fireEvent.click(screen.getByRole("button", { name: /create campaign/i }));

    await waitFor(() => {
      expect(createCampaign).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test Campaign",
          slug: "test-campaign",
        })
      );

      expect(toast.success).toHaveBeenCalledWith("Campaign created!");
      expect(mockPush).toHaveBeenCalledWith("/campaigns");
    });
  });

  it("shows toast error if submission fails", async () => {
    (createCampaign as jest.Mock).mockResolvedValue({
      success: false,
      message: "Failed to create",
    });

    render(<CampaignForm {...defaultProps} />);
    const nameInput = screen.getByLabelText(
      "Campaign name*"
    ) as HTMLInputElement;
    const slugInput = screen.getByLabelText(
      "Campaign slug (URL)*"
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Test Campaign" } });
    fireEvent.change(slugInput, { target: { value: "test-campaign" } });
    fireEvent.click(screen.getByRole("button", { name: /create campaign/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to create");
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
