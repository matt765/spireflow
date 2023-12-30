import { PageContainer } from "../../components/common/PageContainer";
import { CalendarView } from "../../components/views/calendar/CalendarView";
import { getData } from "../../services/getData";



export const Calendar = async () => {
  const eventsData = await getData("events");

  return (
    <PageContainer title="Dashboard" hidePaper>
      <CalendarView calendarEvents={eventsData} />
    </PageContainer>
  );
};

export default Calendar;
