import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

describe("App component", () => {
  it("renders the main title", () => {
    render(<App />);
    const title = screen.getByRole("heading", { name: /typing speed test/i });
    expect(title).toBeInTheDocument();
  });

  it("shows the typing input", () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("shows cancel button when test starts", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");

    // Simular inicio de tipeo
    fireEvent.change(input, { target: { value: "T" } });

    // Usamos findByRole directamente (mejor práctica)
    const cancelButton = await screen.findByRole("button", { name: /cancelar test/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it("does NOT show 'Test finalizado' initially", () => {
    render(<App />);
    const resultText = screen.queryByText(/test finalizado/i);
    expect(resultText).not.toBeInTheDocument();
  });
});
