"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import plLocale from "@fullcalendar/core/locales/pl";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useLocale, useTranslations } from "next-intl";

import { useCalendar } from "./useCalendar";
import { CalendarViewProps } from "./types";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { useTranslateData } from "../../../hooks/useTranslateData";

export const CalendarView = ({ calendarEvents }: CalendarViewProps) => {
  const t = useTranslations("calendar");
  const backendTranslations = useBackendTranslations("calendar");
  const translatedData = useTranslateData(calendarEvents, backendTranslations);

  const {
    currentEvents,
    handleEventClick,
    handleDateSelect,
    handleEventDrop,
    handleEventResize,
  } = useCalendar({ calendarEvents: translatedData });
  
  const locale = useLocale();

  return (
    <div className="w-full h-full lg:p-6 lg:pt-5">
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
        locale={locale === "pl" ? plLocale : "en"}
      />
    </div>
  );
};
