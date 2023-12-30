export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
};

export interface CalendarViewProps {
  calendarEvents: CalendarEvent[];
}
