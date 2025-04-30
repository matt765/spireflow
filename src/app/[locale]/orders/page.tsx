import { PageWrapper } from "../../../components/common/PageWrapper";
import { OrdersView } from "../../../components/views/orders/OrdersView";
import { getData } from "../../../services/getData";

const Orders = async () => {
  const orders = await getData("orders");

  return (
    <PageWrapper pageName="Orders">
      <OrdersView ordersData={orders} />
    </PageWrapper>
  );
};

export default Orders;
