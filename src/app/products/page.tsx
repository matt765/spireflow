import { PageContainer } from "../../components/common/PageContainer";
import { ProductCategory, ProductsView } from "../../components/views/products/ProductsView";
import { getData } from "../../services/getData";

const Products = async () => {
  const productsData = await getData("products");

  return (
    <PageContainer title="Dashboard" className="px-0 flex-row">
      <ProductsView products={productsData} />
    </PageContainer>
  );
};

export default Products;
