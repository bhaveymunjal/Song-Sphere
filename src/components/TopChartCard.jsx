/* eslint-disable arrow-body-style */
// TopChartCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import PlayPause from './PlayPause';

const TopChartCard = ({ data, id, spotify }) => {
  return (
    <div className="w-full flex flex-row items-center py-2 p-4 rounded-lg cursor-pointer mb-2 hover:bg-[#4c426e]">
      <h3 className="font-bold text-base text-white mr-3">{id + 1}.</h3>
      <div className="flex flex-1 flex-row justify-between items-center">
        <img src={data.images[2].url} alt="" className="w-12 h-12 rounded-lg" />
        <div className="flex flex-1 flex-col justify-center mx-3">
          <p className="text-l font-bold text-white">{data.name}</p>
          <Link to={`/artists/${data.artists[0].id}`}>
            <p className="text-base text-gray-300 mt-1 hover:underline">{data.artists[0].name}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        spotify={spotify}
        context_ur={data.uri}
        track_num={1}
      />
    </div>
  );
};

export default TopChartCard;
