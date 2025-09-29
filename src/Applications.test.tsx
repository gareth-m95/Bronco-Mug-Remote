import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Applications from "./Applications";
import { Application } from "../types";

const mockApplications: Application[] = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    loan_amount: 1000,
    loan_type: "Flexi-Loan",
    email: "john@example.com",
    company: "Company A",
    date_created: "2023-01-01T00:00:00.000Z",
    expiry_date: "2023-12-31T00:00:00.000Z",
    loan_history: [],
    avatar: "",
  },
  {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    loan_amount: 2000,
    loan_type: "Business Loan",
    email: "jane@example.com",
    company: "Company B",
    date_created: "2023-01-01T00:00:00.000Z",
    expiry_date: "2023-12-31T00:00:00.000Z",
    loan_history: [],
    avatar: "",
  },
];

describe("Applications Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches and displays applications on mount", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockApplications),
        headers: {
          get: () =>
            '<http://localhost:3001/api/applications?_page=2&_limit=5>; rel="next"',
        },
      } as unknown as Response)
    );

    render(<Applications />);

    await waitFor(() => {
      expect(screen.getAllByTestId("application").length).toBe(2);
    });

    expect(screen.getByRole("button")).toHaveTextContent("Load More");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("loads next page when Load More is clicked", async () => {
    const firstFetchResponse = {
      json: () => Promise.resolve([{ ...mockApplications[0] }]),
      headers: {
        get: () =>
          '<http://localhost:3001/api/applications?_page=2&_limit=5>; rel="next"',
      },
    };
    const secondFetchResponse = {
      json: () => Promise.resolve([{ ...mockApplications[1] }]),
      headers: { get: () => null },
    };

    global.fetch = vi.fn().mockResolvedValueOnce(firstFetchResponse as any);

    render(<Applications />);

    await waitFor(() => {
      expect(screen.getAllByTestId("application").length).toBe(1);
    });

    global.fetch = vi.fn().mockResolvedValueOnce(secondFetchResponse as any);

    const loadMoreBtn = screen.getByRole("button");
    expect(loadMoreBtn).toBeInTheDocument();

    fireEvent.click(loadMoreBtn);

    await waitFor(() => {
      expect(screen.getAllByTestId("application").length).toBe(2);
    });
  });
});
