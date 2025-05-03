import { useTranslations } from "next-intl";

interface BreadcrumbsProps {
  pageName?: string;
}

export const Breadcrumbs = ({ pageName }: BreadcrumbsProps) => {
  const t = useTranslations("breadcrumbs");

  return (
    <div className="text-secondaryText text-sm 1xl:text-base font-semibold">
      {t("firstPart")} &gt; {t(pageName?.toLowerCase() as string)}
    </div>
  );
};
