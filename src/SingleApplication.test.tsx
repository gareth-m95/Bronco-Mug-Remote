import { render, screen } from "@testing-library/react";
import SingleApplication from "./SingleApplication";
import { formatDate } from "./utils/formatDate";
import { Application } from "../types";

const mockApplication: Application = {
  id: 1,
  loan_type: "Flexi-Loan",
  avatar: "",
  loan_history: [],
  company: "Iwoca",
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  loan_amount: 50000,
  date_created: "2021-06-18T00:51:01.161Z",
  expiry_date: "2023-01-01T00:00:00Z",
};

describe("SingleApplication", () => {
  it("renders all application fields correctly", () => {
    render(<SingleApplication application={mockApplication} />);

    expect(screen.getByText("Company").nextSibling?.textContent).toBe(
      mockApplication.company
    );

    expect(screen.getByText("Name").nextSibling?.textContent).toBe(
      `${mockApplication.first_name} ${mockApplication.last_name}`
    );

    expect(screen.getByText("Email").nextSibling?.textContent).toBe(
      mockApplication.email
    );
    expect(screen.getByText("Loan Amount").nextSibling?.textContent).toBe(
      `£${mockApplication.loan_amount.toLocaleString("en-GB")}`
    );

    expect(screen.getByText("Application Date").nextSibling?.textContent).toBe(
      formatDate(mockApplication.date_created)
    );

    expect(screen.getByText("Expiry date").nextSibling?.textContent).toBe(
      formatDate(mockApplication.expiry_date)
    );
  });
});
