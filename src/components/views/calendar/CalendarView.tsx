import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import { initialEvents } from "./CalendarEvents";

let eventGuid = 0;
const createEventId = () => String(eventGuid++);

export const CalendarView: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState(initialEvents);

  const handleEventClick = (clickInfo: any) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleDateSelect = (selectInfo: any) => {
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

  const handleEventDrop = (dropInfo: any) => {
    window.confirm(
      `Move '${dropInfo.event.title}' to ${dropInfo.event.start}?`
    );
  };

  const handleEventResize = (resizeInfo: any) => {
    window.confirm(
      `Change '${resizeInfo.event.title}' to end at ${resizeInfo.event.end}?`
    );
  };

  return (
    <div className="flex w-full pt-8 px-4 md:p-10 lg:p-16 paper text-lg flex-col h-full  pb-16 h-auto">
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
