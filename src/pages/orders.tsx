import { PageContainer } from "../components/PageContainer";
import { Layout } from "../layout/Layout";
import { OrdersView } from "../views/orders/OrdersView";

export default function Orders() {
  return (
    <PageContainer title="Dashboard" className="px-0">
      <OrdersView />
    </PageContainer>
  );
}
