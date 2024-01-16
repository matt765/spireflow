import { PageWrapper } from "../../components/common/PageWrapper";
import { OrdersView } from "../../components/views/orders/OrdersView";
import { client } from "../../services/apolloClient";
import { ORDERS_QUERY } from "../../queries/OrdersQuery";
import { getData } from "../../services/getData";
import { Loader } from "../../components/common/Loader";

export default async function Orders() {
  const orders = await getData("orders");

  return (
    <PageWrapper>
      <OrdersView ordersData={orders} />
    </PageWrapper>
  );
}
