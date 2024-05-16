import { EventDropArg, EventApi } from "@fullcalendar/core";

export type CalendarEvent = {
  id: string;
  title: string;
  start: string | undefined;
  end?: string | undefined; 
};
export interface FullCalendarEvent extends CalendarEvent {
  remove: () => void;
}

export interface CalendarViewProps {
  calendarEvents: CalendarEvent[];
}


export type CalendarAction = "delete" | "move" | null

export interface EventChange {
  oldEvent: EventApi;
  newStart: Date;
  newEnd: Date | undefined;
}