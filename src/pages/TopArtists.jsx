/* eslint-disable no-unused-vars */
import React from 'react';
import { ArtistCard } from '../components';

const TopArtists = ({ relatedArtist }) => {
  // eslint-disable-next-line no-console, react/destructuring-assignment
//   console.log('we are printing related artists from here now', relatedArtist.relatedArtist);
  const capitalizeFirstLetter = (string) => string.replace(/\b\w/g, (match) => match.toUpperCase());
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top artists</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {relatedArtist.map((item, id) => (
          <ArtistCard
            key={id}
            image={item.images[0].url}
            artistName={item.name}
            artistId={item.id}
            genre={item.genres.map((genre) => capitalizeFirstLetter(genre)).join(', ')}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
