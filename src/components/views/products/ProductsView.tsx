"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";

import { OutlinedButton } from "../../common/OutlinedButton";
import useModal from "../../../hooks/useModal";
import { CloseIcon } from "../../../assets/icons/CloseIcon";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { Input } from "../../forms/Input";
import { CopyIcon } from "../../../assets/icons/CopyIcon";
import { ProgressCircles } from "./ProgressCircles";
import { Tooltip } from "../../common/Tooltip";
import { useTooltip } from "../../../hooks/useTooltip";
import { CameraIcon } from "../../../assets/icons/CameraIcon";
import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
    gap: 4,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
});

type ProductPDFProps = {
  product: Product;
};

const ProductPDF = ({ product }: ProductPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Product ID: {product.productId}</Text>
        <Text>Name: {product.name}</Text>
        <Text>Price: ${product.price}</Text>
        <Text>Type: {product.type}</Text>
        {product.parameters.map((param, index) => (
          <Text key={index}>
            {param.title}: {param.value}
          </Text>
        ))}
        {product.metrics.map((metric, index) => (
          <Text key={index}>
            {metric.title}: {metric.firstValue} / {metric.secondValue}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

type Parameter = {
  title: string;
  value: string;
};

type Metric = {
  title: string;
  firstValue: number;
  secondValue: number;
};

type Product = {
  productId: string;
  name: string;
  price: number;
  type: string;
  image: string;
  parameters: Parameter[];
  metrics: Metric[];
};

export type ProductCategory = {
  name: string;
  sales: Product[];
};

interface ThumbnailsPluginInstance {
  visible: boolean;
  hide: () => void;
  show: () => void;
}

export interface ProductParameterProps {
  title: string;
  value: string | number;
}

const ProductParameter = ({ title, value }: ProductParameterProps) => {
  return (
    <div className="flex flex-col pb-0 gap-2 h-[5rem] md:h-[4.5rem] ">
      <span className="text-sm lg:text-[12px] 2xl:text-sm text-secondaryText dark:text-secondaryTextDark">
        {title}
      </span>
      <span className="text-sm lg:text-[12px] 2xl:text-base overflow-hidden">
        {value}
      </span>
    </div>
  );
};

export const ProductsView = ({ products }: { products: Product[] }) => {
  const [activeProduct, setActiveProduct] = useState<Product>({
    productId: "",
    name: "",
    price: 0,
    type: "",
    image: "",
    parameters: [],
    metrics: [],
  });
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const { isOpen, toggle, ref } = useModal();
  const t = useTranslations("products");
  const backendTranslations = useBackendTranslations("products");
  const translatedData = useTranslateData(products, backendTranslations);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  const [copySuccess, setCopySuccess] = useState("");
  const { isTooltipVisible, showTooltip, hideTooltip } = useTooltip();

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showTooltip();
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const categorizeProducts = (products: Product[]): ProductCategory[] => {
    const categories: { [key: string]: Product[] } = {};
    products.forEach((product) => {
      categories[product.type] = categories[product.type] || [];
      categories[product.type].push(product);
    });
    return Object.keys(categories).map((name) => ({
      name,
      sales: categories[name],
    }));
  };

  // Set the first product as default and categorize products on load
  useEffect(() => {
    if (products.length > 0) {
      setActiveProduct(translatedData[0]);
      setProductCategories(categorizeProducts(translatedData));
    }
  }, [products]);

  const handleProductClick = (product: Product) => {
    // Show spinner while image is loading, but only when category changes
    // This is for demo purposes only, due to every product per category having the same image
    if (activeProduct.image !== product.image) {
      setImageLoaded(false);
    } else {
      setImageLoaded(true);
    }
    setActiveProduct(product);
    if (typeof window !== "undefined") {
      if (window.innerWidth < 1024) {
        toggle();
      }
    }
  };

  const renderedCategories = productCategories.map((category) => (
    <div key={category.name} className="flex flex-col gap-1">
      <h4 className="text-md lg:text-sm 2xl:text-[16px] mt-3 mb-2 font-semibold text-secondaryText dark:text-secondaryTextDark">
        {category.name}
      </h4>
      {category.sales.map((product) => (
        <div
          key={product.name}
          onClick={() => handleProductClick(product)}
          className={`text-md lg:text-sm 2xl:text-[16px] p-2 pl-6 cursor-pointer rounded-md ${
            activeProduct.name === product.name
              ? "bg-navItemActiveBg dark:bg-navItemActiveBgDark text-primaryText dark:text-primaryTextDark"
              : "hover:bg-navItemBgHover hover:dark:bg-navItemBgHoverDark text-primaryText dark:text-primaryTextDark"
          }`}
        >
          {product.name}
        </div>
      ))}
    </div>
  ));

  const profit = activeProduct.price * 0.12;

  const handleShowAllProductsClick = () => {
    toggle();
  };

  const thumbnailsRef = useRef<ThumbnailsPluginInstance | null>(null);
  const fullscreenRef = useRef(null);
  const zoomRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-row px-0 w-full xl:pr-1 2xl:pr-4">
      {/* Left panel: Product details */}
      <div className="w-full lg:w-3/4 2xl:p-4 2xl:pt-2">
        <div className="flex flex-col">
          <div className="flex gap-6 md:gap-8 items-center justify-start mb-16 ">
            <div
              onClick={() => setIsPhotoOpen(true)}
              className="group relative min-w-[9rem] hover:bg-[rgb(255,255,255,0.02)] cursor-pointer min-h-[9rem] w-[9rem] h-[9rem] xsm:min-h-[10rem] xsm:min-w-[10rem] sm:h-[10rem] sm:w-[10rem] md:h-[11rem] md:w-[11rem] 2xl:h-[15rem] 2xl:w-[15rem] p-0 rounded-xl  flex justify-center items-center border border-mainBorder dark:border-mainBorderDark "
            >
              <div className="relative w-full h-full flex justify-center items-center">
                {!imageLoaded && (
                  <div className="w-full h-full flex items-center justify-center pl-2">
                    <SpinnerIcon
                      height={120}
                      width={120}
                      className="contentSpinner"
                    />
                  </div>
                )}
                {activeProduct.image && (
                  <img
                    src={activeProduct.image}
                    alt="Product"
                    onLoad={() => setImageLoaded(true)}
                    style={{
                      maxHeight: "100%",
                      display: imageLoaded ? "block" : "none",
                    }}
                  />
                )}
              </div>
              {imageLoaded && (
                <div className="absolute  top-0 left-0 w-full h-full hidden xl:flex justify-center items-center z-20  opacity-0 group-hover:opacity-100 ">
                  <div className="w-10 h-10 text-grayIcon dark:text-grayIconDark">
                    <CameraIcon />
                  </div>
                </div>
              )}
            </div>
            <Lightbox
              plugins={[Thumbnails, Fullscreen, Zoom, Counter]}
              thumbnails={{ ref: thumbnailsRef }}
              open={isPhotoOpen}
              close={() => setIsPhotoOpen(false)}
              // Ternary operators below allow to show multiple photos in gallery for demo purposes
              slides={[
                {
                  src:
                    activeProduct.type === "Phone" ||
                    activeProduct.type === "Telefon"
                      ? "/phone.png"
                      : activeProduct.type === "Tablet"
                      ? "/tablet.png"
                      : "/laptop.png",
                },
                {
                  src:
                    activeProduct.type === "Phone" ||
                    activeProduct.type === "Telefon"
                      ? "/tablet.png"
                      : activeProduct.type === "Tablet"
                      ? "/laptop.png"
                      : "/phone.png",
                },
                {
                  src:
                    activeProduct.type === "Phone" ||
                    activeProduct.type === "Telefon"
                      ? "/laptop.png"
                      : activeProduct.type === "Tablet"
                      ? "/phone.png"
                      : "/tablet.png",
                },
              ]}
              counter={{ container: { style: { top: "unset", bottom: 0 } } }}
              on={{
                click: () => {
                  (thumbnailsRef.current?.visible
                    ? thumbnailsRef.current?.hide
                    : thumbnailsRef.current?.show)?.();
                },
              }}
            />
            <div>
              <h2 className="text-lg md:text-3xl lg:text-3xl 2xl:text-4xl mb-3 xsm:mb-4 text-primaryText dark:text-primaryTextDark">
                {activeProduct.name}
              </h2>
              <div className="flex gap-1">
                <p className=" text-sm md:text-base text-secondaryText dark:text-secondaryTextDark">
                  {t("header.type")}:
                </p>
                <p className=" text-sm md:text-base text-primaryText dark:text-primaryTextDark">
                  {activeProduct.type}
                </p>
              </div>
              <div className="flex text-sm md:text-base 2xl:text-xl gap-2 xsm:gap-4 md:gap-8 mt-2 xsm:mt-3 2xl:mt-4 flex-col xsm:flex-row">
                <div className="flex gap-2">
                  <p className="text-secondaryText dark:text-secondaryTextDark">
                    {t("header.price")}:
                  </p>
                  <p className="text-primaryText dark:text-primaryTextDark">
                    ${activeProduct.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <p className="text-secondaryText dark:text-secondaryTextDark">
                    {t("header.markup")}:
                  </p>
                  <p className="text-primaryText dark:text-primaryTextDark">
                    12%
                  </p>
                  <p className="flex md:hidden text-primaryText dark:text-primaryTextDark">
                    (${profit.toFixed(0)})
                  </p>
                </div>
                <div className="hidden md:flex gap-2">
                  <p className="text-secondaryText dark:text-secondaryTextDark">
                    {t("header.profit")}:
                  </p>
                  <p className="text-primaryText dark:text-primaryTextDark">
                    ${profit.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {activeProduct.parameters.map((param, index) => (
              <div
                key={index}
                className={`text-primaryText dark:text-primaryTextDark ${
                  index <= 8 &&
                  "border-b border-mainBorder dark:border-mainBorderDark"
                }`}
              >
                <ProductParameter title={param.title} value={param.value} />
              </div>
            ))}
          </div>
        </div>
        <ProgressCircles metrics={activeProduct.metrics} />
        <div className="flex justify-center sm:justify-between items-center w-full mt-8 xsm:mt-14">
          <div className="flex items-center gap-2">
            <div className="flex justify-center items-center  relative max-w-[15.5rem]">
              <div className="w-10 text-xl text-secondaryText dark:text-secondaryTextDark">
                ID:
              </div>
              <Input value={activeProduct.productId} type="text"></Input>
              <button
                className="absolute right-2 text-gray-400 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-300"
                onClick={() => handleCopyToClipboard(activeProduct.productId)}
              >
                <CopyIcon />
              </button>
            </div>
            {isTooltipVisible && (
              <div className="hidden sm:flex bottom-1">
                <Tooltip text={t("clipboard.copiedToClipboard")} />
              </div>
            )}
          </div>
          <div className="hidden sm:flex w-[15rem] h-12  items-center justify-end">
            <PDFDownloadLink
              document={<ProductPDF product={activeProduct} />}
              fileName={`${activeProduct.name}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <OutlinedButton
                    text={t("pdf.exportToPdf")}
                    className="min-w-[10rem]"
                  />
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
        <div className="flex lg:hidden w-[100%] text-sm sm:text-md xsm:w-[90%] h-12 mx-auto mt-8 xsm:mt-14 items-center justify-center gap-4">
          <div className="w-1/2">
            <OutlinedButton
              text={t("mobileList.showAllProducts")}
              handleClick={handleShowAllProductsClick}
            />
          </div>
          <div className="flex sm:hidden  w-1/2">
            <PDFDownloadLink
              document={<ProductPDF product={activeProduct} />}
              fileName={`${activeProduct.name}.pdf`}
              style={{ width: "100%" }}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Loading document..."
                ) : (
                  <OutlinedButton
                    text={t("pdf.exportToPdf")}
                    className="w-full"
                  />
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
      {/* Right Panel: List of products */}
      <div className="h-fit hidden lg:flex flex-col w-1/4 p-4 border border-mainBorder dark:border-mainBorderDark ml-8 mt-1 2xl:mt-4 pt-1 rounded-md ">
        <div className="flex flex-col space-y-2">{renderedCategories}</div>
      </div>
      {/* Modal for mobile resolution: List of products */}
      {isOpen && (
        <div
          ref={ref}
          className="w-full h-full fixed left-0 top-0 pt-4 pb-8 z-50 bg-primaryBg dark:bg-primaryBgDark px-8 overflow-auto backdrop-blur-xl"
        >
          <button
            onClick={toggle}
            className="absolute top-7 right-8 stroke-secondaryText dark:stroke-secondaryTextDark fill-secondaryText dark:fill-secondaryTextDark"
          >
            <CloseIcon />
          </button>
          {renderedCategories}
        </div>
      )}
    </div>
  );
};
