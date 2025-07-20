import calculateScore from "../utils/calculateScore";

// Conjunto de pruebas para la función calculateScore
describe("calculateScore", () => {
  // Verifica que la función retorne un puntaje válido sin penalización por errores
  it("debería calcular correctamente la puntuación sin penalización", () => {
    const result = calculateScore(60, 20, 1, 0); // wpm, palabras, precisión, correcciones
    expect(result).toBeGreaterThan(0);
  });

  // Verifica que el puntaje disminuye al aumentar la cantidad de errores
  it("debería reducir el puntaje con errores", () => {
    const result1 = calculateScore(60, 20, 1, 0);
    const result2 = calculateScore(60, 20, 1, 5); // 5 correcciones
    expect(result2).toBeLessThan(result1);
  });

  // Verifica que si el WPM es cero, el puntaje final también lo sea
  it("debería devolver 0 si wpm es 0", () => {
    const result = calculateScore(0, 20, 1, 0);
    expect(result).toBe(0);
  });
});
