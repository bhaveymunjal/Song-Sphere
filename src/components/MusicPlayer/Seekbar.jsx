/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDataLayerValue } from '../../DataLayer';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime, setAppTime, spotify }) => {
  const formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  const [{ token, playerState, item, time, duration }, dispatch] = useDataLayerValue();
  const fetchItem = async () => {
    await spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_PLAYER_STATE',
        playerState: true,
      });
      dispatch({
        type: 'SET_ITEM',
        item: r.item,
      });
      dispatch({
        type: 'SET_TIME',
        time: r.progress_ms,
      });
      dispatch({
        type: 'SET_DURATION',
        duration: r.item.duration_ms,
      });
    });
  };
  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <div className="hidden sm:flex flex-row items-center">
      <p className="text-white">{formatTime(time)}</p>
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
