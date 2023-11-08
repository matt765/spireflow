import { useMemo } from "react";

import { PageContainer } from "../components/common/PageContainer";
import { Layout } from "../layout/Layout";
import { OrdersView } from "../views/orders/OrdersView";
import { CustomersView } from "../views/customers/CustomersView";

export default function Customers() {
  return (
    <PageContainer title="Dashboard">
      <CustomersView />
    </PageContainer>
  );
}
