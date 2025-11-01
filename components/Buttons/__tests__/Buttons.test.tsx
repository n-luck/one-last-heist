import React from "react";
import { render, screen } from "@testing-library/react";
import { AddCampaignButton } from "../AddCampaignButton";
import { AddCharacterButton } from "../AddCharacterButton";
import { useIsLoggedIn } from "@/lib/hooks/useIsLoggedIn";
import "@testing-library/jest-dom";

jest.mock("@/lib/hooks/useIsLoggedIn", () => ({
  useIsLoggedIn: jest.fn(),
}));

describe("AddCampaignButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when the user is not logged in", () => {
    (useIsLoggedIn as jest.Mock).mockReturnValue({ isLoggedIn: false });
    const { container } = render(<AddCampaignButton />);

    expect(container.firstChild).toBeNull();
  });

  it("renders a button linking to the 'Create Campaign' page when logged in", () => {
    (useIsLoggedIn as jest.Mock).mockReturnValue({ isLoggedIn: true });
    render(<AddCampaignButton />);
    const link = screen.getByRole("link", { name: /add new campaign/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/campaigns/create");
  });
});

describe("AddCharacterButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when the user is not logged in", () => {
    (useIsLoggedIn as jest.Mock).mockReturnValue({ isLoggedIn: false });
    const { container } = render(<AddCharacterButton />);

    expect(container.firstChild).toBeNull();
  });

  it("renders a button linking to the 'Create Character' page when logged in", () => {
    (useIsLoggedIn as jest.Mock).mockReturnValue({ isLoggedIn: true });
    render(<AddCharacterButton />);
    const link = screen.getByRole("link", { name: /add new character/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/characters/create");
  });
});
