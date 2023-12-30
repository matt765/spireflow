import { PageContainer } from "../../components/common/PageContainer";
import { CustomersView } from "../../components/views/customers/CustomersView";
import { getData } from "../../services/getData";

const Customers = async () => {
  const customersData = await getData("customers");

  return (
    <PageContainer title="Dashboard" className="flex-col">
      <CustomersView customers={customersData} />
    </PageContainer>
  );
};

export default Customers;
