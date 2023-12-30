"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import { PageContainer } from "../../../components/common/PageContainer";
import phoneImage from "../../../assets/images/phone2.png";

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

const productParameter = (title: string, value: string | number) => {
  return (
    <div className="flex flex-col border-b border-mainBorder dark:border-mainBorderDark pb-4 gap-2">
      <span className="text-sm text-secondaryText dark:text-secondaryTextDark">
        {title}
      </span>
      <span>{value}</span>
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
      setActiveProduct(products[0]);
      setProductCategories(categorizeProducts(products));
    }
  }, [products]);

  const handleProductClick = (product: Product) => {
    setActiveProduct(product);
  };

  const profit = activeProduct.price * 0.12;

  return (
    <>
      {/* Left panel: Product details */}
      <div className="flex-1 p-4">
        <div className="flex flex-col space-y-8">
          <div className="flex gap-8 items-center justify-start mb-8 ">
            <div className="h-[15rem] rounded-xl flex justify-center items-center border border-mainBorder dark:border-mainBorderDark w-[15rem]">
              {activeProduct.image && (
                <Image
                  src={activeProduct.image}
                  alt="Product"
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div>
              <h2 className="text-4xl mb-4">{activeProduct.name}</h2>
              <div className="flex gap-1">
                <p className="text-secondaryText dark:text-secondaryTextDark">
                  Type:
                </p>
                <p>{activeProduct.type}</p>
              </div>
              <div className="flex text-xl gap-8 mt-4">
                <div className="flex gap-2">
                  <p className="text-secondaryText dark:text-secondaryTextDark">
                    Price:
                  </p>
                  <p>${activeProduct.price.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-secondaryText dark:text-secondaryTextDark">
                    Markup:
                  </p>
                  <p>12%</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-secondaryText dark:text-secondaryTextDark">
                    Profit:
                  </p>
                  <p>${profit.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {activeProduct.parameters.map((param, index) => (
              <div key={index}>
                {productParameter(param.title, param.value)}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right Panel: List of products */}
      <div className="w-1/4 p-4 border border-mainBorder dark:border-mainBorderDark m-8 mt-4 rounded-md">
        <div className="flex flex-col space-y-2">
          {productCategories.map((category) => (
            <div key={category.name} className="flex flex-col gap-1">
              <h4 className="text-md mb-1 font-semibold text-secondaryText dark:text-secondaryTextDark">
                {category.name}
              </h4>
              {category.sales.map((product) => (
                <div
                  key={product.name}
                  onClick={() => handleProductClick(product)}
                  className={`p-2 pl-6 cursor-pointer rounded-md ${
                    activeProduct.name === product.name
                      ? "bg-navItemActiveBg dark:bg-navItemActiveBgDark "
                      : "hover:bg-navItemBgHover hover:dark:bg-navItemBgHoverDark"
                  }`}
                >
                  {product.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
