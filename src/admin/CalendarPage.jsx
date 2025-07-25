// src/admin/CalendarPage.jsx
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await getDocs(collection(db, "bookings"));
      const bookings = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          title: `${data.name} - ${data.service}`,
          start: new Date(`${data.date}T${convertTo24Hour(data.time)}`),
          end: new Date(`${data.date}T${convertTo24Hour(data.time, 1)}`),
        };
      });
      setEvents(bookings);
    };

    fetchBookings();
  }, []);

  const convertTo24Hour = (time12h, addHours = 1) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours !== "12") hours = String(+hours + 12);
    if (modifier === "AM" && hours === "12") hours = "00";
    return `${hours.padStart(2, "0")}:${minutes}:00`;
  };

  return (
    <div className="p-6 bg-white rounded shadow min-h-screen">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Booking Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        className="rounded border"
      />
    </div>
  );
};

export default CalendarPage;
