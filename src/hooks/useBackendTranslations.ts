import { useMemo } from "react";
import { useTranslations } from "next-intl";

type TranslationsConfig = {
  [namespace: string]: {
    [key: string]: string;
  };
};

const translationsConfig: TranslationsConfig = {
  orders: {
    "Standard shipping": "deliveryType.standardShipping",
    "Two-day shipping": "deliveryType.twoDayShipping",
    "Free shipping": "deliveryType.freeShipping",
    "Express shipping": "deliveryType.expressShipping",
    Delivered: "status.delivered",
    "In Transit": "status.inTransit",
    Shipped: "status.shipped",
  },
  customers: {
    "New York": "city.newYork",
    Munich: "city.munich",
    Cologne: "city.cologne",
    London: "city.london",
    USA: "country.usa",
    Australia: "country.australia",
    France: "country.france",
    Norway: "country.norway",
    "United Kingdom": "country.unitedKingdom",
  },
  products: {
    "Screen Size": "parameterName.screenSize",
    Processor: "parameterName.processor",
    Memory: "parameterName.memory",
    Storage: "parameterName.storage",
    "Battery Life": "parameterName.batteryLife",
    "Operating System": "parameterName.operatingSystem",
    "Camera Resolution": "parameterName.cameraResolution",
    "Port Types": "parameterName.portTypes",
    Graphics: "parameterName.graphics",
    "Display Resolution": "parameterName.displayResolution",
    "Dimensions and Weight": "parameterName.dimensionsAndWeight",
    "Color Options": "parameterName.colorOptions",
    Phone: "productList.phone",
    Tablet: "productList.tablet",
    Laptop: "productList.laptop",
    inches: "parameterContent.inches",
    "Up to": "parameterContent.upTo",
    "hours talk time": "parameterContent.hoursTalkTime",
    "Lightning connector": "parameterContent.lightningConnector",
    graphics: "parameterContent.graphics",
    pixels: "parameterContent.pixels",
    Blue: "parameterContent.blue",
    Black: "parameterContent.black",
    Pink: "parameterContent.pink",
    Red: "parameterContent.red",
    Type: "parameterContent.type",
    Moonlight: "parameterContent.moonlight",
    "based on": "parameterContent.basedOn",
    "Triple Camera": "parameterContent.tripleCamera",
    "hours video playback": "parameterContent.hoursVideoPlayback",
    main: "parameterContent.main",
    "rear-facing": "parameterContent.rearFacing",
    "front-facing": "parameterContent.frontFacing",
    "hours of mixed usage": "parameterContent.hourseOfMixedUsage",
    "Inventory Status": "metrics.inventoryStatus",
    "Monthly Target": "metrics.monthlyTarget",
    "Order Fulfillment": "metrics.orderFullfillment",
    "Conversion Rate": "metrics.conversionRate",
  },
  "analytics.todaySales": {
    today: "today",
    yesterday: "yesterday",
    average: "average",
  },
  "analytics.totalProfit": {
    sales: "sales",
    Jan: "jan",
    Feb: "feb",
    Mar: "mar",
    Apr: "apr",
    May: "may",
    Jun: "jun",
    Jul: "jul",
    Aug: "aug",
    Sep: "sep",
    Oct: "oct",
    Nov: "nov",
    Dec: "dec",
  },
  "analytics.marketMetrics": {
    "Sales Volume": "metrics.salesVolume",
    Revenue: "metrics.revenue",
    "Growth Rate": "metrics.growthRate",
    "Market Share": "metrics.marketShare",
    "Customer Rating": "metrics.customerRating",
    "Profit Margin": "metrics.profitMargin",
  },
  "homepage.revenuePerCountry": {
    "United States of America": "unitedStates",
    France: "france",
    "United Kingdom": "unitedKingdom",
    Norway: "norway",
    Australia: "australia",
    Poland: "poland",
  },
  "homepage.revenueOverTime": {
    Jan: "jan",
    Feb: "feb",
    Mar: "mar",
    Apr: "apr",
    May: "may",
    Jun: "jun",
    Jul: "jul",
    Aug: "aug",
    Sep: "sep",
    Oct: "oct",
    Nov: "nov",
    Dec: "dec",
  },
  "analytics.performance": {
    sales: "sales",
    profit: "profit",
    Jan: "jan",
    Feb: "feb",
    Mar: "mar",
    Apr: "apr",
    May: "may",
    Jun: "jun",
    Jul: "jul",
    Aug: "aug",
    Sep: "sep",
    Oct: "oct",
    Nov: "nov",
    Dec: "dec",
  },
  "analytics.revenueDistribution": {
    title: "Category Performance",
    inStore: "In-store Revenue",
    online: "Online Revenue",
    Laptops: "laptops",
    Phones: "phones",
    Chargers: "chargers",
    Headphones: "headphones",
    Tablets: "tablets",
    Accessories: "accessories",
  },
  "analytics.yearOverview": {
    title: "title",
    phones: "phones",
    tablets: "tablets",
    laptops: "laptops",
    month: "month",
    Jan: "jan",
    Feb: "feb",
    Mar: "mar",
    Apr: "apr",
    May: "may",
    Jun: "jun",
    Jul: "jul",
    Aug: "aug",
    Sep: "sep",
    Oct: "oct",
    Nov: "nov",
    Dec: "dec",
  },
  calendar: {
    "Market strategy": "marketStrategy",
    "Team Sync": "teamSync",
    "Product review": "productReview",
    "Supplier Meeting": "supplierMeeting",
    "Daily Inventory Check": "dailyInventoryCheck",
    "Marketing Strategy Review": "marketingStrategyReview",
    "SEO Strategy Meeting": "seoStrategyMeeting",
    "Client Meeting": "clientMeeting",
    "Sales Promotion Planning": "salesPromotionPlanning",
    "1-on-1 Meeting": "oneOnOneMeeting",
    "Sales Review": "salesReview",
    "Product Launch Webinar": "productLaunchWebinar",
    "E-commerce Platform Training": "eCommercePlatformTraining",
  },
  "singleCharts.area": {
    views: "Views",
    uniqueVisitors: "Unique Visitors",
  },
  "singleCharts.bars": {
    widgets: "widgets",
    gadgets: "gadgets",
    modules: "modules",
    components: "components",
    kits: "kits",
    accessories: "accessories",
  },
  "singleCharts.scatter": {
    gdp: "gdp",
    lifeExpectancy: "lifeExpectancy",
  },
  "singleCharts.line": {
    Phones: "phones",
    Tablets: "tablets",
    Laptops: "laptops",
    sales: "sales",
    revenue: "revenue",
    unitsSold: "unitsSold",
    returns: "returns",
  },
};

// This hook provides translations that are later used in useTranslateData hook

export const useBackendTranslations = (
  namespace: string
): { [key: string]: string } => {
  const t = useTranslations(namespace);

  const backendTranslations = useMemo(() => {
    const namespaceTranslations = translationsConfig[namespace] || {};
    const mappedTranslations: { [key: string]: string } = {};
    Object.entries(namespaceTranslations).forEach(([key, translationKey]) => {
      mappedTranslations[key] = t(translationKey);
    });
    return mappedTranslations;
  }, [namespace, t]);

  return backendTranslations;
};
