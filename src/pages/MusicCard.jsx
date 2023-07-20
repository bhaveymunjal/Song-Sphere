/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import PlayPause from '../components/PlayPause';

const MusicCard = ({ image, songName, duration, artistName, artistId, spotify, context_ur, track_num }) => (
  <div className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg ">
    <div className="relative w-full h-50 group">
      {/* <div className="absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex "> */}
      <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${songName === artistName ? 'flex bg-black bg-opacity-70' : 'hidden'} `}>
        <PlayPause
          spotify={spotify}
          context_ur={context_ur}
          track_num={track_num}
        />
      </div>
      <img src={image} alt="" />
    </div>
    <div className="flex mt-4 flex-col">
      <p className="font-semibold text-lg text-white truncate">
        {/* <Link to={`/songs/${data?.track?.id}`}> */}
        {songName}
        {/* </Link> */}
      </p>
      <p className=" text-gray-300 truncate hover:underline">
        <Link to={`/artists/${artistId}`}>
          {artistName}
        </Link>
      </p>
      <p className=" text-gray-300 truncate">
        {/* <Link to={`/songs/${data?.track?.id}`}> */}
        {duration}
        {/* </Link> */}
      </p>
    </div>
  </div>
);

export default MusicCard;
