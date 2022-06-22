import {
  addWeeks,
  eachDayOfInterval,
  format,
  getWeek,
  subDays,
  subWeeks,
  addDays,
} from 'date-fns';
import React, { useState } from 'react';
import './App.css';

function DayComp({ dayArr, todaysDate }: { dayArr: Date[]; todaysDate: Date }) {
  const initialSelectedDay = format(todaysDate, 'd');
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay);
  const days = dayArr.map((dayObj) => {
    const today = dayObj.toDateString() === todaysDate.toDateString()
      ? 'calendar__today'
      : '';
    const [day, dayNumber] = format(dayObj, 'E d').split(' ');
    return (
      <button
        type="button"
        className={` ${dayNumber === selectedDay
          ? 'calendar__active calendar__day'
          : 'calendar__day'} ${today} animated-button`}
        onClick={() => {
          setSelectedDay(dayNumber);
        }}
      >
        <span>{day}</span>
        <span>{dayNumber}</span>
      </button>
    );
  });
  return <div className="calendar__days">{days}</div>;
}

function GetRange({ date, todaysDate }: { date: Date; todaysDate: Date }) {
  const threeDaysAfter = addDays(date, 3);
  const threeDaysBehind = subDays(date, 3);
  const dayArr = eachDayOfInterval({
    start: threeDaysBehind,
    end: threeDaysAfter,
  });
  return <DayComp todaysDate={todaysDate} dayArr={dayArr} />;
}

function App() {
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
        <h1>Ergeon Test</h1>
      </header>
      <div className="calendar">
        <div className="calendar_head">
          <button type="button" className="slide slide-left" onClick={handlePrev}>
            <i className="icon-arrow-left" />
            <span>Prev</span>
          </button>
          <p>{`week ${currentWk}`}</p>
          <button type="button" className="slide slide-right" onClick={handleNext}>
            <span>Next</span>
            <i className="icon-arrow-right" />
          </button>
        </div>
        <div className="calendar_body">
          <GetRange date={currentDate} todaysDate={date} />
        </div>
      </div>
    </div>
  );
}

export default App;
