import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import { PageContainer } from "../components/common/PageContainer";
import phoneImage from "../assets/images/phone2.png";

const parameters = [
  { title: "Screen Size", value: "6.1 inches" },
  { title: "Processor", value: "A15 Bionic chip" },
  { title: "Memory", value: "6 GB" },
  { title: "Storage", value: "128 GB / 256 GB / 512 GB" },
  { title: "Battery Life", value: "Up to 19 hours" },
  { title: "Operating System", value: "iOS 15" },
  { title: "Camera Resolution", value: "Dual 12MP camera system" },
  { title: "Port Types", value: "Lightning connector" },
  { title: "Graphics", value: "Apple GPU (4-core graphics)" },
  { title: "Display Resolution", value: "2532 x 1170 pixels at 460 ppi" },
  {
    title: "Dimensions and Weight",
    value: "146.7 mm x 71.5 mm x 7.65 mm, 174 grams",
  },
  { title: "Color Options", value: "Blue, Midnight, Starlight, Pink, Red" },
];

const data = [
  {
    name: "Phones",
    Sales: [
      {
        name: "iPhone 80A",
        price: 2400,
        type: "Phone",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "Samsung Galaxy Z99",
        price: 3400,
        type: "Phone",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "Google Pixel X20",
        price: 1400,
        type: "Phone",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "OnePlus 30T",
        price: 2500,
        type: "Phone",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "Xiaomi Mi 20X",
        price: 1600,
        type: "Phone",
        image: phoneImage,
        parameters: parameters,
      },
    ],
  },
  {
    name: "Tablets",
    Sales: [
      {
        name: "iPad Z50",
        price: 2400,
        type: "Tablet",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "Samsung Galaxy Note S20",
        price: 2400,
        type: "Tablet",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "Microsoft Surface X7",
        price: 2400,
        type: "Tablet",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "Amazon Fire HDX 20",
        price: 2400,
        type: "Tablet",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "Lenovo Tab Z10",
        price: 2400,
        type: "Tablet",
        image: phoneImage,
        parameters: parameters,
      },
    ],
  },
  {
    name: "Laptops",
    Sales: [
      {
        name: "MacBook Air X",
        price: 2400,
        type: "Laptop",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "Dell XLS 30",
        price: 2400,
        type: "Laptop",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "HP Phantom x500",
        price: 2400,
        type: "Laptop",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "Lenovo ThinkPad Z1 Ultra",
        price: 2400,
        type: "Laptop",
        image: phoneImage,
        parameters: parameters,
      },
      {
        name: "ASUS ZenBook Pro 30",
        price: 2400,
        type: "Laptop",
        image: phoneImage,
        parameters: parameters,
      },
    ],
  },
];

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

export default function Products() {
  const [activeProduct, setActiveProduct] = useState({
    name: "",
    price: 0,
    type: "",
    image: undefined as StaticImageData | undefined,
  });

  // First phone as default on load
  useEffect(() => {
    if (data.length > 0 && data[0].Sales.length > 0) {
      const firstPhone = data[0].Sales[0];
      setActiveProduct({
        name: firstPhone.name,
        price: firstPhone.price,
        type: firstPhone.type,
        image: firstPhone.image,
      });
    }
  }, []);

  const handleProductClick = (
    name: string,
    type: string,
    price: number,
    image: StaticImageData | undefined
  ) => {
    setActiveProduct({ name, type, price, image });
  };

  const profit = activeProduct.price * 0.12;

  return (
    <PageContainer title="Dashboard" className="px-0">
      <div className="w-full h-full flex paper p-8">
        {/* Left panel: Product details */}
        <div className="flex-1 p-4">
          <div className="flex flex-col space-y-8">
            <div className="flex gap-8 items-center justify-start mb-8 ">
              <div className="h-[15rem] rounded-xl flex justify-center items-center border border-mainBorder dark:border-mainBorderDark w-[15rem]">
                {activeProduct.image && (
                  <Image src={activeProduct.image} alt="Product" />
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
              {parameters.map((param, index) => (
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
            {data.map((category) => (
              <div key={category.name} className="flex flex-col gap-1">
                <h4 className="text-md mb-1 font-semibold text-secondaryText dark:text-secondaryTextDark">
                  {category.name}
                </h4>
                {category.Sales.map((product) => (
                  <div
                    key={product.name}
                    onClick={() =>
                      handleProductClick(
                        product.name,
                        product.type,
                        product.price,
                        product.image
                      )
                    }
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
      </div>
    </PageContainer>
  );
}
