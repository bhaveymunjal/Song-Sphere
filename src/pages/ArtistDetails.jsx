/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Loader, RelatedSongs } from '../components';
import { useDataLayerValue } from '../DataLayer';

const ArtistDetails = (spotify) => {
  const [{ token, artists }, dispatch] = useDataLayerValue();
  const { id: artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setArtist(artistResponse.data);

        const topTracksResponse = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=IN`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        setTopTracks(topTracksResponse.data.tracks);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  if (!artist || topTracks.length === 0) {
    return <div><Loader /></div>;
  }
  const capitalizeFirstLetter = (string) => string.replace(/\b\w/g, (match) => match.toUpperCase());

  const genres = artist.genres.map((genre) => capitalizeFirstLetter(genre)).join(', ');
  return (
    <div className="flex flex-col">
      <DetailsHeader
        imgURL={artist.images[0].url}
        name={artist.name}
        genres={genres}
        followers={artist.followers.total}
      />
      <RelatedSongs
        data={topTracks}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        spotify={spotify}
      />
    </div>
  );
};

export default ArtistDetails;
