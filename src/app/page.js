"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const PomodoroClock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [originalSessionLength, setOriginalSessionLength] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    setOriginalSessionLength(sessionLength * 60);
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          if (prevTimeLeft <= 0) {
            clearInterval(timerRef.current);
            if (isSession) {
              setIsSession(false);
              setTimeLeft(breakLength * 60);
            } else {
              setIsSession(true);
              setTimeLeft(originalSessionLength);
            }
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, isSession, breakLength, originalSessionLength]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setSessionLength(25);
    setOriginalSessionLength(25 * 60);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-8">25 + 5 Clock</h1>
      <div className="flex space-x-8 mb-8">
        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-2">Break Length</h2>
          <div className="flex items-center space-x-2">
            <button 
              className="bg-red-500 text-white p-2 rounded-full shadow-md"
              onClick={() => setBreakLength(prev => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <span className="text-xl">{breakLength}</span>
            <button 
              className="bg-green-500 text-white p-2 rounded-full shadow-md"
              onClick={() => setBreakLength(prev => Math.min(prev + 1, 60))}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl mb-2">Session Length</h2>
          <div className="flex items-center space-x-2">
            <button 
              className="bg-red-500 text-white p-2 rounded-full shadow-md"
              onClick={() => setSessionLength(prev => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <span className="text-xl">{sessionLength}</span>
            <button 
              className="bg-green-500 text-white p-2 rounded-full shadow-md"
              onClick={() => setSessionLength(prev => Math.min(prev + 1, 60))}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl mb-4">{isSession ? 'Session' : 'Break'}</h2>
        <span className="text-6xl font-mono">{formatTime(timeLeft)}</span>
      </div>
      <div className="flex space-x-4 mt-8">
        <button 
          className="bg-blue-500 text-white p-4 rounded-full shadow-md"
          onClick={() => setIsRunning(!isRunning)}
        >
          <FontAwesomeIcon icon={isRunning ? faPause : faPlay} />
        </button>
        <button 
          className="bg-yellow-500 text-white p-4 rounded-full shadow-md"
          onClick={handleReset}
        >
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroClock;
