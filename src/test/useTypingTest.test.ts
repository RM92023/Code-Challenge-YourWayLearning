import { renderHook, act } from "@testing-library/react";
import { useTypingTest } from "../hooks/useTypingTest";

// Se mockea useTimer para controlar el tiempo en las pruebas
jest.mock("../hooks/useTimer", () => ({
  useTimer: () => ({
    getElapsedTimeInMinutes: () => 0.2,
    reset: jest.fn(),
  }),
}));

describe("useTypingTest", () => {
  const target = "hello world";

  // Verifica que el estado inicial se configure correctamente con el texto objetivo
  it("debe inicializar con el texto objetivo dividido en palabras", () => {
    const { result } = renderHook(() => useTypingTest(target));

    // El hook divide el texto en palabras y establece valores iniciales
    expect(result.current.words).toEqual(["hello", "world"]);
    expect(result.current.isFinished).toBe(false);
    expect(result.current.wpm).toBeNull();
  });

  // Verifica que el test inicie al escribir por primera vez
  it("debe comenzar el test al escribir por primera vez", () => {
    const { result } = renderHook(() => useTypingTest(target));

    act(() => {
      result.current.onInputChange("h");
    });

    expect(result.current.isStarted).toBe(true);
    expect(result.current.input).toBe("h");
  });

  // Verifica que al tipear correctamente una palabra, se almacene y se avance a la siguiente
  it("debe registrar una palabra correctamente tipeada y avanzar", () => {
    const { result } = renderHook(() => useTypingTest(target));

    act(() => {
      result.current.onInputChange("hello");
    });

    // La palabra correcta se añade a typedCorrect y se limpia el input
    expect(result.current.typedCorrect).toBe("hello ");
    expect(result.current.input).toBe("");
    expect(result.current.words).toEqual(["world"]); // Avanza a la siguiente palabra
  });

  // Verifica que el test finaliza al tipear todas las palabras correctamente y calcula métricas
  it("debe finalizar el test, calcular wpm y precisión", () => {
    const { result } = renderHook(() => useTypingTest(target));

    act(() => {
      result.current.onInputChange("hello");
    });

    act(() => {
      result.current.onInputChange("world");
    });

    // El test debe marcarse como finalizado y las métricas deben calcularse
    expect(result.current.isFinished).toBe(true);
    expect(result.current.wpm).toBeGreaterThan(0);
    expect(result.current.accuracyReal).toBeGreaterThan(0);
    expect(result.current.accuracyVisual).toBeGreaterThan(0);
  });

  // Verifica que se incremente el contador de correcciones al borrar texto
  it("debe aumentar el contador de correcciones al borrar", () => {
    const { result } = renderHook(() => useTypingTest(target));

    act(() => {
      result.current.onInputChange("hel");
    });

    act(() => {
      result.current.onInputChange("he");
    });

    expect(result.current.corrections).toBe(1);
  });

  // Verifica que al llamar a reset() se reinicie completamente el estado del test
  it("debe resetear todo al llamar reset()", () => {
    const { result } = renderHook(() => useTypingTest(target));

    act(() => {
      result.current.onInputChange("hello");
      result.current.reset(); // Se reinicia el estado del hook
    });

    expect(result.current.input).toBe("");
    expect(result.current.words).toEqual(["hello", "world"]);
    expect(result.current.isFinished).toBe(false);
    expect(result.current.isStarted).toBe(false);
    expect(result.current.wpm).toBeNull();
  });
});
