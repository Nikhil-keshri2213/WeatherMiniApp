import React, { useRef } from "react";
import "./Hourly.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Hourly({ hourlyData, forecastDate }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative mt-6">
      <div
        ref={scrollRef}
        className="mx-10 py-2 flex gap-4 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center shadow-lg bg-slate-200 py-2 rounded px-4"
          >
            <p className="text-xs text-slate-800 font-bold text-center mt-1">
              {new Date(forecastDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </p>
            <p className="text-lg text-slate-800 text-center mt-1">
              {new Date(hour.time).getHours()}:00
            </p>
            <img
              src={hour.condition.icon}
              alt="Weather"
              className="w-10 mx-auto"
            />

            <p className="text-lg font-bold text-slate-900">{hour.temp_c}℃</p>
            <p className="text-xs text-slate-700 text-center mt-1">
              {hour.condition.text}
            </p>
          </div>
        ))}
      </div>

      {/* scroll buttons */}
      <button
        onClick={scrollLeft}
        className="flex items-center justify-center absolute left-1 top-1/2 bg-blue-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 shadow hover:bg-blue-600"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={scrollRight}
        className="flex items-center justify-center absolute right-1 top-1/2 bg-blue-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 shadow hover:bg-blue-600"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Hourly;
