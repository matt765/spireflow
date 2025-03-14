"use client";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { CloseIcon } from "../../../assets/icons/CloseIcon";
import { Product } from "./types";
import { ProductDetails } from "./ProductDetails";
import { useProducts } from "./useProducts";

export const ProductsView = ({ products }: { products: Product[] }) => {
  const {
    activeProduct,
    productCategories,
    isOpen,
    toggle,
    ref,
    isPhotoOpen,
    setIsPhotoOpen,
    isTooltipVisible,
    handleCopyToClipboard,
    handleProductClick,
    handleShowAllProductsClick,
    imageLoaded,
    setImageLoaded,
  } = useProducts(products);

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

  return (
    <div className="flex flex-row px-0 w-full xl:pr-1 2xl:pr-4">
      {/* Left panel */}
      <ProductDetails
        isTooltipVisible={isTooltipVisible}
        activeProduct={activeProduct}
        isPhotoOpen={isPhotoOpen}
        setIsPhotoOpen={setIsPhotoOpen}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        handleCopyToClipboard={handleCopyToClipboard}
        handleShowAllProductsClick={handleShowAllProductsClick}
      />
      {/* Right Panel: List of products */}
      <div className="h-fit hidden  dark:bg-[rgb(0,0,0,0.01)] bg-[rgb(0,0,0,0.01)] lg:flex flex-col w-1/4 p-4 border border-mainBorder dark:border-mainBorderDark ml-8 mt-1 2xl:mt-4 pt-1 rounded-md ">
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
