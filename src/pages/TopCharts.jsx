/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDataLayerValue } from '../DataLayer';
import TopChartCard from '../components/TopChartCard';
import MusicCard from './MusicCard';
import { Error, Loader } from '../components';

const AroundYou = (spotify) => {
  const [{ token, artists }, dispatch] = useDataLayerValue();
  const [country, setCountry] = useState('');
  const [Loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [topTracks, setTopTracks] = useState([]);
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  // eslint-disable-next-line no-console
  // console.log(country);
  useEffect(() => {
    // at_FwTXQVhGBuU847NEiTYXoFtaVTj62
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_FwTXQVhGBuU847NEiTYXoFtaVTj62')
      .then((res) => setCountry(res?.data?.location?.country))
      // eslint-disable-next-line no-console
      .catch((err) => <Error />)
      .finally(() => setLoading(false));
  }, [country]);
  useEffect(() => {
    // eslint-disable-next-line consistent-return
    const fetchArtistDetails = async () => {
      try {
        // Fetch top tracks
        const topTracksResponse = await axios.get(`https://api.spotify.com/v1/recommendations?limit=50&market=${country}&seed_artists=4YRxDV8wJFPHPTeXepOstw`, {
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
        // console.error('Error fetching country featured playlist details:', error);
        return <Error />;
      }
      // eslint-disable-next-line no-console
      // console.log('Top tracks are as follow', topTracks);
    };

    fetchArtistDetails();
  }, [country]);
  if (topTracks.length === 0) {
    return <div><Loader /></div>;
  }
  // eslint-disable-next-line no-console
  console.log(topTracks);
  return (
    <div className="flex flex-col mt-5 ">
      <h2 className="font-bold text-3xl mb-2 text-left text-white">
        Top Charts
      </h2>
      <div className="mt-4 flex flex-wrap gap-4">
        {topTracks.map((item, id) => (
          <MusicCard
            key={id}
            image={item.album.images[0].url}
            songName={item.name}
            duration={formatDuration(item.duration_ms)}
            artistName={item.album.artists[0].name}
            artistId={item.album.artists[0].id}
            spotify={spotify}
            track_num={item.track_number}
            context_ur={item.album.uri}
          />
        ))}
      </div>
    </div>
  );
};
export default AroundYou;
