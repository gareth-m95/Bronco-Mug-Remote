import { render, screen } from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";

vi.mock("./Applications", () => {
  return {
    default: () => <div />,
  };
});
test('renders "Application Portal" title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Application portal/i);
  expect(linkElement).toBeInTheDocument();
});
