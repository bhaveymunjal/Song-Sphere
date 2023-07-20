/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsHeader, Loader, RelatedSongs } from '../components';
import { useDataLayerValue } from '../DataLayer';

const ArtistDetails = (spotify) => {
  const [{ token, artists }, dispatch] = useDataLayerValue();
  const { id: artistId } = useParams();
  // eslint-disable-next-line no-console
  // console.log('Artist id is - ', artistId);
  // eslint-disable-next-line no-console
  // console.log('Token id is - ', token);
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        // Fetch artist details
        const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setArtist(artistResponse.data);

        // Fetch top tracks
        const topTracksResponse = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=IN`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        // eslint-disable-next-line no-console
        // console.log('Top track Response - ', topTracksResponse);
        setTopTracks(topTracksResponse.data.tracks);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching artist details:', error);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  if (!artist || topTracks.length === 0) {
    return <div><Loader /></div>;
  }
  // eslint-disable-next-line no-console
  // console.log('Top tracks are as folow - ', topTracks);
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

  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  // if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

  // if (error) return <Error />;

  // return (
  //   <div className="flex flex-col">
  //     <DetailsHeader
  //       imgURL={artist.images[0].url}
  //       name = {artist.name}
  //       genres={genres}
  //       artistId={artistId}
  //       artistData={artistData?.data[0]}
  //     />

  //     <RelatedSongs
  //       data={artistData?.data[0].views['top-songs']?.data}
  //       artistId={artistId}
  //       isPlaying={isPlaying}
  //       activeSong={activeSong}
  //     />
  //   </div>
  // );
};

export default ArtistDetails;
