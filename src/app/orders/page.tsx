import { PageContainer } from "../../components/common/PageContainer";
import { OrdersView } from "../../components/views/orders/OrdersView";
import { client } from "../../services/apolloClient";
import { ORDERS_QUERY } from "../../queries/OrdersQuery";
import { getData } from "../../services/getData";
import { Loader } from "../../components/common/Loader";

export default async function Orders() {
  const orders = await getData("orders");

  return (
    <PageContainer title="Dashboard" className="px-0">
      <OrdersView ordersData={orders} />
    </PageContainer>
  );
}
