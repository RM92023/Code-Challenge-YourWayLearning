import { getTopScores, saveScore } from "../api/leaderboard";

// ✅ Mock global de fetch
global.fetch = jest.fn();

describe("API leaderboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("guarda un nuevo puntaje correctamente", async () => {
    const newEntry = {
      username: "Chupi",
      score: 120,
      accuracy: 0.95,
      wpm: 55,
      words: 30,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => newEntry,
    });

    const result = await saveScore(newEntry);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/leaderboard"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(newEntry),
      })
    );

    expect(result).toEqual(newEntry);
  });

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

    expect(result).toEqual(
      [...mockScores].sort((a, b) => b.score - a.score)
    );
  });

  it("lanza error si el fetch de puntajes falla", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(getTopScores()).rejects.toThrow("Error al cargar los puntajes");
  });

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
