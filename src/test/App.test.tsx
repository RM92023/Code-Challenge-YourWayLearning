import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

// Conjunto de pruebas para el componente principal App
describe("App component", () => {
  // Verifica que el título principal se renderice correctamente
  it("renders the main title", () => {
    render(<App />);
    const title = screen.getByRole("heading", { name: /typing speed test/i });
    expect(title).toBeInTheDocument();
  });

  // Verifica que el campo de texto esté presente desde el inicio
  it("shows the typing input", () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  // Verifica que al empezar a tipear, se muestre el botón de cancelar
  it("shows cancel button when test starts", async () => {
    render(<App />);
    const input = screen.getByRole("textbox");

    // Simula que el usuario empieza a escribir
    fireEvent.change(input, { target: { value: "T" } });

    // Espera a que aparezca el botón de cancelar
    const cancelButton = await screen.findByRole("button", { name: /cancelar test/i });
    expect(cancelButton).toBeInTheDocument();
  });

  // Verifica que el mensaje 'Test finalizado' no aparezca al inicio
  it("does NOT show 'Test finalizado' initially", () => {
    render(<App />);
    const resultText = screen.queryByText(/test finalizado/i);
    expect(resultText).not.toBeInTheDocument();
  });
});
