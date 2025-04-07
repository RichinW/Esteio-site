"use client"
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const DateRange = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <>
      <div className="flex justify-center items-center gap-2 shadow-[0px_0px_5px_rgba(0,0,0,0.15)] px-4 py-2 rounded-md">
        <i className="fa-solid fa-calendar text-gray-700 text-xl"></i>
        <p className="text-gray-700">Período</p>
        <div className="bg-gray-200 py-1 px-2 flex justify-center items-center rounded-full gap-1">
        <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            placeholderText="Jane 2025"
            dateFormat="MMMM yyyy"
            className="w-28 px-2 rounded-full bg-transparent text-gray-700 focus:outline-none focus:border-none"
          />
          <p className="text-gray-700">-</p>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            placeholderText="Jane 2025"
            dateFormat="MMMM yyyy"
            className="w-28 px-2 rounded-full bg-transparent text-gray-700 focus:outline-none focus:border-none"
          />
        </div>
      </div>
    </>
  );
};

export default DateRange;
