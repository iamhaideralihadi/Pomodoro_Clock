// components/PomodoroClock.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const PomodoroClock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      clearInterval(timer);
    }
    if (timeLeft === 0) {
      if (isSession) {
        setTimeLeft(breakLength * 60);
      } else {
        setTimeLeft(sessionLength * 60);
      }
      setIsSession(!isSession);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isSession, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsSession(true);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">25 + 5 Clock</h1>
      <div className="flex space-x-8 mb-8">
        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-2">Break Length</h2>
          <div className="flex items-center space-x-2">
            <button 
              className="bg-red-500 text-white p-2 rounded-full"
              onClick={() => setBreakLength((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <span className="text-xl">{breakLength}</span>
            <button 
              className="bg-green-500 text-white p-2 rounded-full"
              onClick={() => setBreakLength((prev) => Math.min(prev + 1, 60))}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-2">Session Length</h2>
          <div className="flex items-center space-x-2">
            <button 
              className="bg-red-500 text-white p-2 rounded-full"
              onClick={() => setSessionLength((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <span className="text-xl">{sessionLength}</span>
            <button 
              className="bg-green-500 text-white p-2 rounded-full"
              onClick={() => setSessionLength((prev) => Math.min(prev + 1, 60))}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl mb-4">{isSession ? 'Session' : 'Break'}</h2>
        <span className="text-6xl font-mono">{formatTime(timeLeft)}</span>
      </div>
      <div className="flex space-x-4 mt-8">
        <button 
          className="bg-blue-500 text-white p-4 rounded-full"
          onClick={() => setIsRunning(!isRunning)}
        >
          <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
        </button>
        <button 
          className="bg-yellow-500 text-white p-4 rounded-full"
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroClock;
