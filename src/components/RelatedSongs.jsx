import React from 'react';
import SongBar from './SongBar';

const RelatedSongs = ({ data, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick, spotify }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Top Songs:</h1>

    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={i}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
          spotify={spotify}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
