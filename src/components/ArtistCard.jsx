/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';

const ArtistCard = ({ image, artistName, artistId, genre }) => (
  <div className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg ">
    <Link to={`/artists/${artistId}`}>
      <div className="relative w-full h-50 group">
        <img src={image} alt="" className="w-full h-full" />
        <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity" />
      </div>
    </Link>
    <div className="flex mt-4 flex-col">
      <p className=" text-gray-300 truncate ">{artistName}</p>
      <p className=" text-gray-500 truncate">{genre}</p>
    </div>
  </div>
);

export default ArtistCard;
