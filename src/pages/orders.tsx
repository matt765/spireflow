import { PageContainer } from "../components/PageContainer";
import { Layout } from "../layout/Layout";
import {  OrdersView } from "../views/orders/OrdersView";

export default function Orders() {
  return (
    <Layout>
      <PageContainer title="Dashboard">
        <OrdersView />
      </PageContainer>
    </Layout>
  );
}
