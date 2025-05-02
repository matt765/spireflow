import { renderHook } from "@testing-library/react";

import { useTranslateData } from "../../hooks/useTranslateData";

describe("useTranslateData", () => {
  const data = [
    { title: "Hello", description: "World", items: ["Apple", "Banana"] },
    { title: "Goodbye", description: "Universe", items: ["Orange", "Grape"] },
  ];

  const translations = {
    Hello: "Hola",
    World: "Mundo",
    Goodbye: "Adiós",
    Universe: "Universo",
    Apple: "Manzana",
    Banana: "Plátano",
    Orange: "Naranja",
    Grape: "Uva",
  };

  it("should translate data correctly", () => {
    const { result } = renderHook(() => useTranslateData(data, translations));

    const translatedData = [
      { title: "Hola", description: "Mundo", items: ["Manzana", "Plátano"] },
      { title: "Adiós", description: "Universo", items: ["Naranja", "Uva"] },
    ];

    expect(result.current).toEqual(translatedData);
  });

  it("should return original data if translations are empty", () => {
    const { result } = renderHook(() => useTranslateData(data, {}));

    expect(result.current).toEqual(data);
  });

  it("should handle nested objects and arrays correctly", () => {
    const nestedData = [
      {
        title: "Hello",
        details: {
          description: "World",
          items: [{ name: "Apple" }, { name: "Banana" }],
        },
      },
    ];

    const nestedTranslatedData = [
      {
        title: "Hola",
        details: {
          description: "Mundo",
          items: [{ name: "Manzana" }, { name: "Plátano" }],
        },
      },
    ];

    const { result } = renderHook(() =>
      useTranslateData(nestedData, translations)
    );

    expect(result.current).toEqual(nestedTranslatedData);
  });
});
