import { renderHook, act } from "@testing-library/react-hooks";

import { useModal } from "../../hooks/useModal";
import { useTooltip } from "../../hooks/useTooltip";
import { useTranslateData } from "../../hooks/useTranslateData";
import { useBackendTranslations } from "../../hooks/useBackendTranslations";
import { useTranslations } from "next-intl";
import { Product } from "../../components/views/products/types";
import { useProducts } from "../../components/views/products/useProducts";

jest.mock("../../hooks/useModal");
jest.mock("../../hooks/useTooltip");
jest.mock("../../hooks/useTranslateData");
jest.mock("../../hooks/useBackendTranslations");
jest.mock("next-intl");

const mockUseModal = useModal as jest.Mock;
const mockUseTooltip = useTooltip as jest.Mock;
const mockUseTranslateData = useTranslateData as jest.Mock;
const mockUseBackendTranslations = useBackendTranslations as jest.Mock;
const mockUseTranslations = useTranslations as jest.Mock;

const mockProducts: Product[] = [
  {
    productId: "1",
    name: "Product 1",
    price: 100,
    type: "Category 1",
    image: "image1.jpg",
    parameters: [],
    metrics: [],
  },
  {
    productId: "2",
    name: "Product 2",
    price: 200,
    type: "Category 2",
    image: "image2.jpg",
    parameters: [],
    metrics: [],
  },
];

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with products and categories", () => {
    mockUseModal.mockReturnValue({
      isOpen: false,
      toggle: jest.fn(),
      ref: { current: null },
    });
    mockUseTooltip.mockReturnValue({
      isTooltipVisible: false,
      showTooltip: jest.fn(),
    });
    mockUseTranslateData.mockReturnValue(mockProducts);
    mockUseBackendTranslations.mockReturnValue({});
    mockUseTranslations.mockReturnValue((key: string) => key);

    const { result } = renderHook(() => useProducts(mockProducts));

    expect(result.current.activeProduct).toEqual(mockProducts[0]);
    expect(result.current.productCategories).toEqual([
      { name: "Category 1", sales: [mockProducts[0]] },
      { name: "Category 2", sales: [mockProducts[1]] },
    ]);
  });

  it("should handle product click", () => {
    const toggleMock = jest.fn();

    mockUseModal.mockReturnValue({
      isOpen: false,
      toggle: toggleMock,
      ref: { current: null },
    });
    mockUseTooltip.mockReturnValue({
      isTooltipVisible: false,
      showTooltip: jest.fn(),
    });
    mockUseTranslateData.mockReturnValue(mockProducts);
    mockUseBackendTranslations.mockReturnValue({});
    mockUseTranslations.mockReturnValue((key: string) => key);

    // Mock window.innerWidth to be less than 1024
    Object.defineProperty(window, "innerWidth", { writable: true, value: 800 });
    window.dispatchEvent(new Event("resize"));

    const { result } = renderHook(() => useProducts(mockProducts));

    act(() => {
      result.current.handleProductClick(mockProducts[1]);
    });

    expect(result.current.activeProduct).toEqual(mockProducts[1]);
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  it("should handle copying to clipboard", async () => {
    const showTooltipMock = jest.fn();
    const writeTextMock = jest.fn();

    mockUseModal.mockReturnValue({
      isOpen: false,
      toggle: jest.fn(),
      ref: { current: null },
    });
    mockUseTooltip.mockReturnValue({
      isTooltipVisible: false,
      showTooltip: showTooltipMock,
    });
    mockUseTranslateData.mockReturnValue(mockProducts);
    mockUseBackendTranslations.mockReturnValue({});
    mockUseTranslations.mockReturnValue((key: string) => key);

    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const { result } = renderHook(() => useProducts(mockProducts));

    await act(async () => {
      await result.current.handleCopyToClipboard("test text");
    });

    expect(writeTextMock).toHaveBeenCalledWith("test text");
    expect(showTooltipMock).toHaveBeenCalledTimes(1);
  });

  it("should handle showing all products", () => {
    const toggleMock = jest.fn();

    mockUseModal.mockReturnValue({
      isOpen: false,
      toggle: toggleMock,
      ref: { current: null },
    });
    mockUseTooltip.mockReturnValue({
      isTooltipVisible: false,
      showTooltip: jest.fn(),
    });
    mockUseTranslateData.mockReturnValue(mockProducts);
    mockUseBackendTranslations.mockReturnValue({});
    mockUseTranslations.mockReturnValue((key: string) => key);

    const { result } = renderHook(() => useProducts(mockProducts));

    act(() => {
      result.current.handleShowAllProductsClick();
    });

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
