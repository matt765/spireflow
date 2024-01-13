"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";

import { useCalendar } from "./useCalendar";
import { CalendarViewProps } from "./types";

export const CalendarView = ({ calendarEvents }: CalendarViewProps) => {
  const {
    currentEvents,
    handleEventClick,
    handleDateSelect,
    handleEventDrop,
    handleEventResize,
  } = useCalendar({ calendarEvents });

  return (
    <div className="flex w-full pt-8 px-4 md:p-10 lg:p-16 bg-primaryBg xl:rounded-[12px] shadow-lg dark:bg-primaryBgDark border dark:border-mainBorderDark border-mainBorder text-lg flex-col h-full  pb-16 h-auto">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={currentEvents}
        eventClick={handleEventClick}
        selectable={true}
        weekends={false}
        showNonCurrentDates={false}
        select={handleDateSelect}
        editable={true}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
      />
    </div>
  );
};
