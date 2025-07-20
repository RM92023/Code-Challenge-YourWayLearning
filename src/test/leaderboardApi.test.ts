import { getTopScores, saveScore } from "../api/leaderboard";

// Mock global de fetch para simular llamadas a la API
global.fetch = jest.fn();

describe("API leaderboard", () => {
  // Limpia los mocks antes de cada prueba para evitar contaminación entre tests
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verifica que se guarde un nuevo puntaje correctamente usando POST
  it("guarda un nuevo puntaje correctamente", async () => {
    const newEntry = {
      username: "Chupi",
      score: 120,
      accuracy: 0.95,
      wpm: 55,
      words: 30,
    };

    // Simula una respuesta exitosa del servidor
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => newEntry,
    });

    const result = await saveScore(newEntry);

    // Verifica que se hizo la llamada a la API con los parámetros correctos
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/leaderboard"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(newEntry),
      })
    );

    // Verifica que la respuesta coincida con lo simulado
    expect(result).toEqual(newEntry);
  });

  // Verifica que se retornen los puntajes ordenados de mayor a menor
  it("retorna los puntajes ordenados correctamente", async () => {
    const mockScores = [
      { username: "A", score: 50, accuracy: 0.9, wpm: 40, words: 30 },
      { username: "B", score: 100, accuracy: 0.95, wpm: 60, words: 25 },
      { username: "C", score: 75, accuracy: 0.85, wpm: 35, words: 20 },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockScores,
    });

    const result = await getTopScores();

    // Verifica que los puntajes estén ordenados descendente por score
    expect(result).toEqual(
      [...mockScores].sort((a, b) => b.score - a.score)
    );
  });

  // Verifica que se lance un error si falla la carga de puntajes
  it("lanza error si el fetch de puntajes falla", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getTopScores()).rejects.toThrow("Error al cargar los puntajes");
  });

  // Verifica que se lance un error si falla el guardado de un puntaje
  it("lanza error si el fetch de guardar puntaje falla", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(
      saveScore({
        username: "Error",
        score: 10,
        accuracy: 0.5,
        wpm: 10,
        words: 5,
      })
    ).rejects.toThrow("Error al guardar el puntaje");
  });
});
