import { useMemo } from "react";

import { PageContainer } from "../components/common/PageContainer";
import { Layout } from "../layout/Layout";
import { OrdersView } from "../components/views/orders/OrdersView";
import { CustomersView } from "../components/views/customers/CustomersView";

export default function Customers() {
  return (
    <PageContainer title="Dashboard">
      <CustomersView />
    </PageContainer>
  );
}
