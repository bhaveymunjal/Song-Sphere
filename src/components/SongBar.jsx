/* eslint-disable arrow-body-style */
import React from 'react';

import PlayPause from './PlayPause';

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const SongBar = ({ song, i, activeSong, spotify }) => {
  return (
    <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong === song ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song.album.images[0].url.replace('{w}', '125').replace('{h}', '125')}
          alt={song?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className="text-xl font-bold text-white">
            {song?.name}
          </p>
          <p className="text-base text-gray-300 mt-1">
            {formatDuration(song.duration_ms)}
          </p>
        </div>
      </div>
      <PlayPause
        context_ur={song.album.uri}
        track_num={song.track_number}
        spotify={spotify}
        duration={song.duration_ms}
      />
    </div>
  );
};

export default SongBar;
