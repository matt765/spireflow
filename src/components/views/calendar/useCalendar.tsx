import React, { useEffect, useState } from "react";

import { CalendarEvent, CalendarViewProps } from "./types";
import { DateSelectArg, EventClickArg, EventDropArg } from "@fullcalendar/core";
import { EventResizeDoneArg } from "@fullcalendar/interaction";

let eventGuid = 0;
const createEventId = () => String(eventGuid++);

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

export const mockDatesForEvents = [
  {
    start: new Date(currentYear, currentMonth, 3, 10).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 3, 15, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 6, 12).toISOString(),
  },

  {
    start: new Date(currentYear, currentMonth, 17, 12, 30).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 14, 10, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 14, 16, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 25, 14, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 25, 16, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 27, 11, 0).toISOString(),
    end: new Date(currentYear, currentMonth, 27, 13, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 30, 15, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 30, 10, 0).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 9, 14).toISOString(),
    end: new Date(currentYear, currentMonth, 12, 14).toISOString(),
  },
  {
    start: new Date(currentYear, currentMonth, 21, 12).toISOString(),
    end: new Date(currentYear, currentMonth, 24, 10).toISOString(),
  },
];

export const useCalendar = ({ calendarEvents }: CalendarViewProps) => {
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // Here we assign dates to each event from the backend based on index
    // Normally dates would come from backend, but I wanted to keep events always in current month for demo purposes
    const mergedEvents = calendarEvents.map((event, index) => {
      const mockDate = mockDatesForEvents[index];
      return { ...event, ...mockDate };
    });
    setCurrentEvents(mergedEvents);
  }, [calendarEvents]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = window.prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      setCurrentEvents([
        ...currentEvents,
        {
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
        },
      ]);
    }
  };

  const handleEventDrop = (dropInfo: EventDropArg) => {
    window.confirm(
      `Move '${dropInfo.event.title}' to ${dropInfo.event.start}?`
    );
  };
  const handleEventResize = (resizeInfo: EventResizeDoneArg) => {
    window.confirm(
      `Change '${resizeInfo.event.title}' to end at ${resizeInfo.event.end}?`
    );
  };

  return {
    currentEvents,
    handleEventClick,
    handleDateSelect,
    handleEventDrop,
    handleEventResize,
  };
};
