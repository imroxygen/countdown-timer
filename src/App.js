import { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [start, isStart] = useState(false);
  const [flag, setFlag] = useState(false);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [timerid, setTimerid] = useState(0);
  const changeState = () => {
    if (hour < 0 || min < 0 || sec <= 0) {
      alert("Pls enter time");
    } else {
      isStart(true);
    }
  };
  const handlePause = () => {
    setFlag(true);
    clearInterval(timerid);
  };
  const handleResume = () => {
    setFlag(false);
    runTimer(sec, min, hour, timerid);
  };
  const handleInput = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    if (id === "hour") {
      if (value !== 0) {
        setHour(value);
      }
    } else if (id === "min") {
      if (value !== 0) {
        setMin(value);
      }
    } else {
      if (value !== 0) {
        setSec(value);
      }
    }
  };
  const resetButton = () => {
    isStart(false);
    setHour(0);
    setMin(0);
    setSec(0);
    clearInterval(timerid);
    return;
  };
  const runTimer = (se, mi, hr, tid) => {
    console.log(sec, min);
    if (se > 0) {
      setSec((s) => s - 1);
    } else if (se === 0 && mi > 0) {
      setMin((m) => m - 1);
      setSec(59);
    } else if (mi === 0) {
      setHour((h) => h - 1);
      setMin(59);
      setSec(59);
    }

    if (se === 0 && mi === 0 && hr === 0) {
      setSec(0);
      setMin(0);
      setHour(0);
      clearInterval(tid);
      alert("done");
      isStart(false);
      return;
    }
  };
  useEffect(() => {
    let tid;
    if (start) {
      tid = setInterval(() => {
        runTimer(sec, min, hour, tid);
      }, 1000);
      setTimerid(tid);
    }
    return () => {
      clearInterval(tid);
    };
  }, [start, hour, min, sec]);
  return (
    <div className="App">
      <h1>Countdown Timer</h1>

      {!start && (
        <div className="input-container">
          <div className="input-box">
            <input
              id="hour"
              type="number"
              placeholder="HH"
              onChange={handleInput}
            />
            <span>:</span>
            <input
              id="min"
              type="number"
              placeholder="MM"
              onChange={handleInput}
            />
            <span>:</span>
            <input
              id="sec"
              type="number"
              placeholder="SS"
              onChange={handleInput}
            />
          </div>
          <button onClick={changeState} className="timer-button">
            Start
          </button>
        </div>
      )}

      {start && (
        <div className="show-container">
          <div className="timer-box">
            <div>{hour < 10 ? `0${hour}` : hour}</div>
            <span>:</span>
            <div>{min < 10 ? `0${min}` : min}</div>
            <span>:</span>
            <div>{sec < 10 ? `0${sec}` : sec}</div>
          </div>
          <div className="action-button">
            {!flag ? (
              <button onClick={handlePause} className="timer-button">
                Pause
              </button>
            ) : (
              <button onClick={handleResume} className="timer-button">
                Resume
              </button>
            )}
            <button onClick={resetButton} className="timer-button">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
