import { useMemo } from "react";

import { PageContainer } from "../components/PageContainer";
import { Layout } from "../layout/Layout";
import { OrdersView } from "../views/orders/OrdersView";

export default function Customers() {
  return (
    <Layout>
      <PageContainer title="Dashboard">
        <OrdersView />
      </PageContainer>
    </Layout>
  );
}
