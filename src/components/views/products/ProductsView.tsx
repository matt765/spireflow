"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ProgressCircle } from "@tremor/react";
import { useTranslations } from "next-intl";

import { OutlinedButton } from "../../common/OutlinedButton";
import useModal from "../../../hooks/useModal";
import { CloseIcon } from "../../../assets/icons/CloseIcon";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";
import { Input } from "../../forms/Input";
import { CopyIcon } from "../../../assets/icons/CopyIcon";

type Parameter = {
  title: string;
  value: string;
};

type Product = {
  name: string;
  price: number;
  type: string;
  image: string;
  parameters: Parameter[];
};

export type ProductCategory = {
  name: string;
  sales: Product[];
};

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
    name: "",
    price: 0,
    type: "",
    image: "",
    parameters: [],
  });
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );
  const { isOpen, toggle, ref } = useModal();
  const t = useTranslations("products");
  const backendTranslations = useBackendTranslations("products");
  const translatedData = useTranslateData(products, backendTranslations);

  // Function to group products into categories
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

  // Open categories modal only on mobile
  const handleProductClick = (product: Product) => {
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

  return (
    <div className="flex flex-row px-0 w-full pr-4">
      {/* Left panel: Product details */}
      <div className="w-3/4 2xl:p-4 2xl:pt-2">
        <div className="flex flex-col">
          <div className="flex gap-6 md:gap-8 items-center justify-start mb-16 ">
            <div className="min-w-[9rem] min-h-[9rem] w-[9rem] h-[9rem] xsm:min-h-[10rem] xsm:min-w-[10rem] sm:h-[10rem] sm:w-[10rem] md:h-[11rem] md:w-[11rem] 2xl:h-[15rem] 2xl:w-[15rem] p-6 rounded-xl  flex justify-center items-center border border-mainBorder dark:border-mainBorderDark ">
              <div className="relative w-full h-full">
                {activeProduct.image && (
                  <Image src={activeProduct.image} alt="Product" fill={true} />
                )}
              </div>
            </div>
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
          <div className="grid grid-cols-2 xsm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
        <div className="flex justify-center items-center mt-16 w-full gap-10 pl-0 pr-0">
          <div className="w-1/2 px-8  mx-auto flex justify-center items-center border border-mainBorder dark:border-mainBorderDark  py-12 rounded-md">
            <div className="flex gap-8 items-center">
              <ProgressCircle value={72} size="xl" color="slate">
                <span className="text-xl text-secondaryText dark:text-secondaryTextDark font-medium">
                  72%
                </span>
              </ProgressCircle>
              <div className="flex flex-col">
                <div className="font-medium text-2xl text-primaryText dark:text-primaryTextDark">
                  $340 / $450
                </div>
                <div className="text-sm text-secondaryText dark:text-secondaryTextDark">
                  Spend management
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 px-8  mx-auto flex justify-center items-center  border border-mainBorder dark:border-mainBorderDark py-12 rounded-md">
            <div className="flex gap-8 items-center">
              <ProgressCircle value={42} size="xl" color="slate">
                <span className="text-xl text-secondaryText dark:text-secondaryTextDark font-medium">
                  42%
                </span>
              </ProgressCircle>
              <div className="flex flex-col">
                <div className="font-medium text-2xl text-primaryText dark:text-primaryTextDark">
                  $340 / $450
                </div>
                <div className="text-sm text-secondaryText dark:text-secondaryTextDark">
                  Spend management
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10 w-full gap-10 pl-0 pr-0">
          <div className="w-1/2 px-8  mx-auto  border flex justify-center items-center border-mainBorder dark:border-mainBorderDark  py-12 rounded-md">
            <div className="flex gap-8 items-center">
              <ProgressCircle value={36} size="xl" color="slate">
                <span className="text-xl text-secondaryText dark:text-secondaryTextDark font-medium">
                  36%
                </span>
              </ProgressCircle>
              <div className="flex flex-col">
                <div className="font-medium text-2xl text-primaryText dark:text-primaryTextDark">
                  $340 / $450
                </div>
                <div className="text-sm text-secondaryText dark:text-secondaryTextDark">
                  Spend management
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 px-8  mx-auto  border flex justify-center items-center border-mainBorder dark:border-mainBorderDark  py-12 rounded-md">
            <div className="flex gap-8 items-center">
              <ProgressCircle value={82} size="xl" color="slate">
                <span className="text-xl text-secondaryText dark:text-secondaryTextDark font-medium">
                  82%
                </span>
              </ProgressCircle>
              <div className="flex flex-col">
                <div className="font-medium text-2xl text-primaryText dark:text-primaryTextDark">
                  $340 / $450
                </div>
                <div className="text-sm text-secondaryText dark:text-secondaryTextDark">
                  Spend management
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full mt-8 xsm:mt-14">
          <div className="flex justify-center items-center w-[16rem] relative">
            <div className="w-10 text-xl text-secondaryText dark:text-secondaryTextDark">
              ID:
            </div>
            <Input value="NCUB439034G2J" type="text"></Input>
            <button className="absolute right-2 text-gray-400 dark:text-gray-400 hover:text-gray-300 dark:hover:text-gray-300">
              <CopyIcon />
            </button>
          </div>
          <div className="flex  w-48 h-12  items-center justify-center">
            <OutlinedButton
              text="Export as PDF"
              handleClick={handleShowAllProductsClick}
            />
          </div>
        </div>
        <div className="flex lg:hidden w-48 h-12 mx-auto mt-8 xsm:mt-14 items-center justify-center">
          <OutlinedButton
            text="Show all products"
            handleClick={handleShowAllProductsClick}
          />
        </div>
      </div>
      {/* Right Panel: List of products */}
      <div className="h-fit hidden lg:flex flex-col w-1/4 p-4 border border-mainBorder dark:border-mainBorderDark ml-8 mt-4 pt-1 rounded-md ">
        <div className="flex flex-col space-y-2">{renderedCategories}</div>
      </div>
      {/* Modal for mobile resolution: List of products */}
      {isOpen && (
        <div
          ref={ref}
          className="w-full h-full fixed left-0 top-0 pt-4 pb-8 z-50 bg-primaryBg dark:bg-primaryBgDark px-8 overflow-auto"
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
