import { useRef } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import Lightbox, { ThumbnailsRef } from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { OutlinedButton } from "../../common/OutlinedButton";
import { Input } from "../../forms/Input";
import { CopyIcon } from "../../../assets/icons/CopyIcon";
import { ProgressCircles } from "./ProgressCircles";
import { Tooltip } from "../../common/Tooltip";
import { CameraIcon } from "../../../assets/icons/CameraIcon";
import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";
import { ProductParameter } from "./ProductParameter";
import { ProductPDF } from "./ProductPDF";
import { ProductDetailsProps } from "./types";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export const ProductDetails = ({
  activeProduct,
  isPhotoOpen,
  setIsPhotoOpen,
  imageLoaded,
  setImageLoaded,
  handleCopyToClipboard,
  handleShowAllProductsClick,
  isTooltipVisible,
}: ProductDetailsProps) => {
  const t = useTranslations("products");

  const thumbnailsRef = useRef<ThumbnailsRef>(null);
  const profit = activeProduct.price * 0.12;

  return (
    <div className="w-full lg:w-3/4 2xl:p-4 2xl:pt-2">
      <div className="flex flex-col">
        <div className="flex gap-6 md:gap-8 items-center justify-start mb-16 ">
          <div
            onClick={() => setIsPhotoOpen(true)}
            className="group relative min-w-[9rem] hover:bg-[rgb(255,255,255,0.02)] cursor-pointer min-h-[9rem] w-[9rem] h-[9rem] xsm:min-h-[10rem] xsm:min-w-[10rem] sm:h-[10rem] sm:w-[10rem] md:h-[11rem] md:w-[11rem] 2xl:h-[15rem] 2xl:w-[15rem] p-0 rounded-xl  flex justify-center items-center border border-mainBorder dark:border-mainBorderDark "
          >
            <div className="rounded-xl relative w-full h-full dark:bg-[rgb(0,0,0,0.01)] bg-[rgb(0,0,0,0.01)] flex justify-center items-center
         
            ">
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
            {({ loading }) =>
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
            {({ loading }) =>
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
  );
};
