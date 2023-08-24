let eventGuid = 0;
const createEventId = () => String(eventGuid++);
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

export const initialEvents = [
  {
    id: createEventId(),
    title: "Meeting",
    start: new Date(currentYear, currentMonth, 3).toISOString(),
  },
  {
    id: createEventId(),
    title: "Team Sync",
    start: new Date(currentYear, currentMonth, 3, 15, 0).toISOString(),
  },
  {
    id: createEventId(),
    title: "Doctor appointment",
    start: new Date(currentYear, currentMonth, 6).toISOString(),
  },

  {
    id: createEventId(),
    title: "Supplier Meeting",
    start: new Date(currentYear, currentMonth, 17, 12, 30).toISOString(),
  },
  {
    id: createEventId(),
    title: "Daily Inventory Check",
    start: new Date(currentYear, currentMonth, 14, 10, 0).toISOString(),
  },
  {
    id: createEventId(),
    title: "Marketing Strategy Review",
    start: new Date(currentYear, currentMonth, 14, 16, 0).toISOString(),
  },
  {
    id: createEventId(),
    title: "SEO Strategy Meeting",
    start: new Date(currentYear, currentMonth, 25, 14, 0).toISOString(),
  },
  {
    id: createEventId(),
    title: "Client Meeting",
    start: new Date(currentYear, currentMonth, 25, 16, 0).toISOString(),
  },
  {
    id: createEventId(),
    title: "Sales Promotion Planning",
    start: new Date(currentYear, currentMonth, 27, 11, 0).toISOString(),
    end: new Date(currentYear, currentMonth, 27, 13, 0).toISOString(),
  },
  {
    id: createEventId(),
    title: "Dentist Appointment",
    start: new Date(currentYear, currentMonth, 27, 15, 0).toISOString(),
  },
  {
    id: createEventId(),
    title: "1-on-1 Meeting",
    start: new Date(currentYear, currentMonth, 30, 15, 0).toISOString(),
  },
  {
    id: createEventId(),
    title: "Sales Review",
    start: new Date(currentYear, currentMonth, 30, 10, 0).toISOString(),
  },
  {
    id: createEventId(),
    title: "Product Launch Webinar",
    start: new Date(currentYear, currentMonth, 9).toISOString(),
    end: new Date(currentYear, currentMonth, 12).toISOString(),
  },
  {
    id: createEventId(),
    title: "E-commerce Platform Training",
    start: new Date(currentYear, currentMonth, 21).toISOString(),
    end: new Date(currentYear, currentMonth, 24).toISOString(),
  },
];
