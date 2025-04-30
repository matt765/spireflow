interface BreadcrumbsProps {
  pageName?: string;
}

export const Breadcrumbs = ({ pageName }: BreadcrumbsProps) => {
  return (
    <div className="text-secondaryText text-1xl font-semibold">
      Home &gt; {pageName}
    </div>
  );
};
