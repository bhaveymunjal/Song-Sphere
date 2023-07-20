/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { useDataLayerValue } from '../../DataLayer';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime, setAppTime }) => {
  // converts the time to format 0:00
  const formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  const [{ token, playerState, item, time }, dispatch] = useDataLayerValue();
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerState && item) {
        setAppTime(parseInt((time / item.duration_ms) * 100, 10));
      }
    }, 1000);

    // return () => clearInterval(interval);
  }, 1000);
  useEffect(() => {
    if (item) {
      setDuration(item.duration_ms);
    }
  }, 1000);
  return (
    <div className="hidden sm:flex flex-row items-center">
      <p className="text-white">{value === 0 ? '0:00' : formatTime(time)}</p>
      <input
        type="range"
        step="any"
        value={time}
        min={min}
        max={duration}
        onInput={onInput}
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white">{max === 0 ? '0:00' : formatTime(duration)}</p>
    </div>
  );
};

export default Seekbar;
