import calculateScore from "../utils/calculateScore";

describe("calculateScore", () => {
  it("debería calcular correctamente la puntuación sin penalización", () => {
    const result = calculateScore(60, 20, 1, 0);
    expect(result).toBeGreaterThan(0);
  });

  it("debería reducir el puntaje con errores", () => {
    const result1 = calculateScore(60, 20, 1, 0);
    const result2 = calculateScore(60, 20, 1, 5);
    expect(result2).toBeLessThan(result1);
  });

  it("debería devolver 0 si wpm es 0", () => {
    const result = calculateScore(0, 20, 1, 0);
    expect(result).toBe(0);
  });
});
