import React, { useState, useEffect } from 'react';

const App = () => {
  const [time, setTime] = useState(0); // Tracks time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Tracks if the stopwatch is running

  // useEffect to update time while the stopwatch is running
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment time every 10ms (for 2 decimal places)
      }, 10);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Formatting the time (milliseconds to minutes:seconds:milliseconds)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 1000) / 10;
    return (
      (minutes < 10 ? '0' : '') +
      minutes +
      ':' +
      (seconds < 10 ? '0' : '') +
      seconds +
      ':' +
      (milliseconds < 10 ? '0' : '') +
      milliseconds
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>React Stopwatch</h1>
      <h2>{formatTime(time)}</h2>
      <div>
        {!isRunning ? (
          <button onClick={() => setIsRunning(true)}>Start</button>
        ) : (
          <button onClick={() => setIsRunning(false)}>Stop</button>
        )}
        <button onClick={() => { setTime(0); setIsRunning(false); }}>Reset</button>
      </div>
    </div>
  );
};

export default App;
