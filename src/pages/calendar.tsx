import { PageContainer } from "../components/common/PageContainer";
import { Layout } from "../layout/Layout";
import { CalendarView } from "../views/calendar/CalendarView";

export default function Customers() {
  return (
    <PageContainer title="Dashboard">
      <CalendarView />
    </PageContainer>
  );
}
