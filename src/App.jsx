import React from "react";
import "./App.css";

const DayComp = ({ day }) => {
  return (
    <div>
      <button>{day}</button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{"Ergeon Test"}</h1>
      </header>
      <div>
        <div className={"days"}>
          <button>{"Previous"}</button>
          {[...Array(7).keys()].map((i, idx) => (
            <DayComp day={idx} />
          ))}
          <button>{"Next"}</button>
        </div>
        <input placeholder={"example input"} />
      </div>
    </div>
  );
}

export default App;
