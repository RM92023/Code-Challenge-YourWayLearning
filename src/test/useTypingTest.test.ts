import { renderHook, act } from "@testing-library/react";
import { useTypingTest } from "../hooks/useTypingTest";

// ✅ Mock correcto con ruta relativa desde `src/test` hacia `src/hooks`
jest.mock("../hooks/useTimer", () => ({
  useTimer: () => ({
    getElapsedTimeInMinutes: () => 0.2,
    reset: jest.fn(),
  }),
}));

describe("useTypingTest", () => {
  const target = "hello world";

  it("debe inicializar con el texto objetivo dividido en palabras", () => {
    const { result } = renderHook(() => useTypingTest(target));
    expect(result.current.words).toEqual(["hello", "world"]);
    expect(result.current.isFinished).toBe(false);
    expect(result.current.wpm).toBeNull();
  });

  it("debe comenzar el test al escribir por primera vez", () => {
    const { result } = renderHook(() => useTypingTest(target));
    act(() => {
      result.current.onInputChange("h");
    });
    expect(result.current.isStarted).toBe(true);
    expect(result.current.input).toBe("h");
  });

  it("debe registrar una palabra correctamente tipeada y avanzar", () => {
    const { result } = renderHook(() => useTypingTest(target));

    act(() => {
      result.current.onInputChange("hello");
    });

    expect(result.current.typedCorrect).toBe("hello ");
    expect(result.current.input).toBe("");
    expect(result.current.words).toEqual(["world"]);
  });

  it("debe finalizar el test, calcular wpm y precisión", () => {
    const { result } = renderHook(() => useTypingTest(target));

    act(() => {
      result.current.onInputChange("hello");
    });

    act(() => {
      result.current.onInputChange("world");
    });

    expect(result.current.isFinished).toBe(true);
    expect(result.current.wpm).toBeGreaterThan(0);
    expect(result.current.accuracyReal).toBeGreaterThan(0);
    expect(result.current.accuracyVisual).toBeGreaterThan(0);
  });

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

  it("debe resetear todo al llamar reset()", () => {
    const { result } = renderHook(() => useTypingTest(target));

    act(() => {
      result.current.onInputChange("hello");
      result.current.reset();
    });

    expect(result.current.input).toBe("");
    expect(result.current.words).toEqual(["hello", "world"]);
    expect(result.current.isFinished).toBe(false);
    expect(result.current.isStarted).toBe(false);
    expect(result.current.wpm).toBeNull();
  });
});
