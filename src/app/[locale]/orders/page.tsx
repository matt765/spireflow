import { PageWrapper } from "../../../components/common/PageWrapper";
import { OrdersView } from "../../../components/views/orders/OrdersView";
import { getData } from "../../../services/getData";

export default async function Orders() {
  const orders = await getData("orders");

  return (
    <PageWrapper>
      <OrdersView ordersData={orders} />
    </PageWrapper>
  );
}
