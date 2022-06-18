import {
  addWeeks,
  eachDayOfInterval,
  format,
  getWeek,
  subDays,
  subWeeks,
} from "date-fns";
import { addDays } from "date-fns/esm";
import React, { useState } from "react";
import "./App.css";

const DayComp = ({
  dayArr,
  todaysDate,
}: {
  dayArr: Date[];
  todaysDate: Date;
}) => {
  const initialSelectedDay = format(todaysDate, "d");
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay);
  const days = dayArr.map((dayObj) => {
    const today =
      dayObj.toDateString() === todaysDate.toDateString()
        ? "calendar__today"
        : "";
    const [day, dayNumber] = format(dayObj, "E d").split(" ");
    return (
      <div
        className={`${
          dayNumber === selectedDay
            ? "calendar__active calendar__day"
            : "calendar__day"
        } ${today}`}
        onClick={() => {
          setSelectedDay(dayNumber);
        }}
      >
        <div>{day}</div>
        <div>{dayNumber}</div>
      </div>
    );
  });
  return <div className={"calendar__days"}>{days}</div>;
};

const GetRange = ({ date, todaysDate }: { date: Date; todaysDate: Date }) => {
  const threeDaysAfter = addDays(date, 3);
  const threeDaysBehind = subDays(date, 3);

  const dayArr = eachDayOfInterval({
    start: threeDaysBehind,
    end: threeDaysAfter,
  });

  return <DayComp todaysDate={todaysDate} dayArr={dayArr} />;
};

const App = () => {
  const date = new Date();

  const [currentWk, setCurrentWk] = useState(getWeek(date));

  const [currentDate, setCurrentDate] = useState(date);

  const handleNext = () => {
    setCurrentWk(currentWk + 1);
    setCurrentDate(addWeeks(currentDate, 1));
  };
  const handlePrev = () => {
    setCurrentWk(currentWk - 1);
    setCurrentDate(subWeeks(currentDate, 1));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{"Ergeon Test"}</h1>
      </header>
      <div className="calendar">
        <div className="calendar_head">
          <button onClick={handlePrev}>{"<<<"}</button>
          <p>{`week ${currentWk}`}</p>
          <button onClick={handleNext}>{">>>"}</button>
        </div>
        <div className="calendar_body">
          {<GetRange date={currentDate} todaysDate={date} />}
        </div>
      </div>
    </div>
  );
};

export default App;
