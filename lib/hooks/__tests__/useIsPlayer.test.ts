import { useSession } from "next-auth/react";
import { renderHook } from "@testing-library/react";

import { useIsPlayer } from "../useIsPlayer";
import { mockSession } from "@/lib/constants/mocks";

jest.mock("next-auth/react");
jest.mock("next-auth/react", () => ({ useSession: jest.fn() }));

describe("useIsPlayer hook", () => {
  const mockUseSession = useSession as jest.Mock;

  it("returns true for the correct player", () => {
    mockUseSession.mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    const { result } = renderHook(() => useIsPlayer("Jeeves"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPlayer).toBe(true);
    expect(result.current.session).toEqual(mockSession);
  });

  it("returns false for a different player", () => {
    mockUseSession.mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    const { result } = renderHook(() => useIsPlayer("Wooster"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPlayer).toBe(false);
    expect(result.current.session).toEqual(mockSession);
  });

  it("returns false if unauthenticated", () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    const { result } = renderHook(() => useIsPlayer("Jeeves"));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPlayer).toBe(false);
    expect(result.current.session).toBeNull();
  });

  it("returns false if no playerName is passed", () => {
    mockUseSession.mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    const { result } = renderHook(() => useIsPlayer());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isPlayer).toBe(false);
    expect(result.current.session).toEqual(mockSession);
  });
});
