/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';

const ArtistCard = ({ image, artistName, artistId, genre }) => (
  <div className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg ">
    <div className="relative w-full h-50 group">
      <img src={image} alt="" />
    </div>
    <div className="flex mt-4 flex-col">
      <p className=" text-gray-300 truncate hover:underline">
        <Link to={`/artists/${artistId}`}>
          {artistName}
        </Link>
      </p>
      <p className=" text-gray-500 truncate">
        {genre}
      </p>
    </div>
  </div>
);

export default ArtistCard;
