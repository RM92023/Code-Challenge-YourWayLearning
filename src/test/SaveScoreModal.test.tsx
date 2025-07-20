import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SaveScoreModal from "../components/SaveScoreModal/SaveScoreModal";
import { saveScore } from "../api/leaderboard";
import { toast } from "react-toastify";

// Mock API y Toast
jest.mock("../api/leaderboard", () => ({
  saveScore: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockOnClose = jest.fn();
const scoreData = {
  score: 100,
  accuracy: 0.9,
  wpm: 50,
  words: 20,
};

describe("SaveScoreModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("no se renderiza cuando open es false", () => {
    const { container } = render(
      <SaveScoreModal open={false} scoreData={scoreData} onClose={mockOnClose} />
    );
    expect(container.innerHTML).toBe("");
  });

  it("renderiza el modal cuando open es true", () => {
    render(<SaveScoreModal open={true} scoreData={scoreData} onClose={mockOnClose} />);
    expect(screen.getByText("Guardar puntaje")).toBeInTheDocument();
  });

  it("muestra error si se intenta guardar sin nombre", () => {
    render(<SaveScoreModal open={true} scoreData={scoreData} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText("Guardar"));
    expect(screen.getByText("El nombre es obligatorio.")).toBeInTheDocument();
  });

  it("llama a saveScore y onClose correctamente", async () => {
    (saveScore as jest.Mock).mockResolvedValueOnce({});

    render(<SaveScoreModal open={true} scoreData={scoreData} onClose={mockOnClose} />);
    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), {
      target: { value: "Alice" },
    });
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(saveScore).toHaveBeenCalledWith({
        username: "Alice",
        ...scoreData,
      });
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("¡Puntaje guardado exitosamente!");
    });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("muestra error si saveScore lanza excepción", async () => {
    (saveScore as jest.Mock).mockRejectedValueOnce(new Error("Error"));

    render(<SaveScoreModal open={true} scoreData={scoreData} onClose={mockOnClose} />);
    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), {
      target: { value: "ErrorTest" },
    });
    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(saveScore).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Ocurrió un error al guardar el puntaje.");
    });

    await waitFor(() => {
      expect(screen.getByText("Error al guardar el puntaje.")).toBeInTheDocument();
    });
  });
});
