/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover } from './pages';
import HomePage from './components/HomePage';
import { getTokenFromUrl } from './redux/services/Sp';
import { useDataLayerValue } from './DataLayer';
import WebPlayback from './WebPlayback';

const spotify = new SpotifyWebApi();
const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  // const [token, setToken] = useState(null);
  // eslint-disable-next-line no-empty-pattern
  const [{ user, devices, token, playlists, playerState, releases, artists, relatedArtist, CurrentlyPlaying, charts }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    // eslint-disable-next-line no-underscore-dangle
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });
      // setToken(_token);
      spotify.setAccessToken(_token);
      // eslint-disable-next-line no-shadow
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          // eslint-disable-next-line object-shorthand
          user: user,
        });
      });
      // eslint-disable-next-line no-shadow
      spotify.getPlaylist('37i9dQZEVXbLZ52XmnySJg').then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          // eslint-disable-next-line object-shorthand
          playlists: (playlists.tracks.items),
        });
      });
      // eslint-disable-next-line no-shadow
      spotify.getArtists(['4PULA4EFzYTrxYvOVlwpiQ', '6DARBhWbfcS9E4yJzcliqQ', '3OQRPFFS3OsltFjFAXu1kE', '3lmszXxkp47K9kDCRRPU8p', '4YRxDV8wJFPHPTeXepOstw', '6pU5oz09VUYtnFTd4P1Mxn', '4Ai0pGz6GhQavjzaRhPTvz']).then((artists) => {
        dispatch({
          type: 'SET_ARTISTS',
          // eslint-disable-next-line object-shorthand
          artists: artists.artists,
        });
      });
      // eslint-disable-next-line no-shadow
      spotify.getNewReleases().then((releases) => {
        dispatch({
          type: 'SET_RELEASES',
          // eslint-disable-next-line object-shorthand
          releases: releases.albums.items,
        });
        dispatch({
          type: 'SET_CHARTS',
          // eslint-disable-next-line object-shorthand
          charts: releases,
        });
      });
      // eslint-disable-next-line no-shadow
      spotify.getArtistRelatedArtists('4PULA4EFzYTrxYvOVlwpiQ').then((relatedArtist) => {
        dispatch({
          type: 'SET_RELATEDARTISTS',
          // eslint-disable-next-line object-shorthand
          relatedArtist: relatedArtist.artists,
        });
      });
      // eslint-disable-next-line no-shadow
      spotify.getMyCurrentPlayingTrack().then((track) => {
        // eslint-disable-next-line no-console
        // console.log(track);
        dispatch({
          type: 'SET_CURRENTTRACK',
          // eslint-disable-next-line object-shorthand
          CurrentlyPlaying: track,
        });
        // }
      });
      spotify.getMyDevices().then((device) => {
        // eslint-disable-next-line no-console
        // console.log(device);
        dispatch({
          type: 'SET_DEVICES',
          // eslint-disable-next-line object-shorthand
          devices: device,
        });
      });
    }
    // eslint-disable-next-line no-console
    // console.log('Token exists - ', token);
    // eslint-disable-next-line no-console
    // console.log('Related Artists - ', relatedArtist);
  }, []);

  // const playlist = Object.entries(playlists);
  // eslint-disable-next-line no-console
  // console.log('🧑‍🦱', user);
  // eslint-disable-next-line no-console
  // console.log('👽', token);
  // eslint-disable-next-line no-console
  // console.log('🎵', playlists);
  // eslint-disable-next-line no-console
  // console.log('releases', releases);
  // eslint-disable-next-line no-console
  // console.log('artists - ', artists);
  // eslint-disable-next-line no-console
  // console.log('Currently Playing Tracks - ', CurrentlyPlaying);
  // eslint-disable-next-line no-console
  // console.log('Available devices are ', devices);
  // eslint-disable-next-line no-console
  // console.log('Charts printed from app.jsx', charts);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!token && (<HomePage />) }
      {token && (
      <div className="relative flex">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
          {/* <Searchbar /> */}
          <div className="px-6 h-[calc(100vh)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
            {/* <div className="px-6 h-[calc(100vh-72px)] flex xl:flex-row flex-col-reverse"> */}
            <div className="flex-1 h-fit ">
              <Routes>
                <Route path="/" element={<Discover data={playlists} spotify={spotify} />} />
                <Route path="/top-artists" element={<TopArtists relatedArtist={relatedArtist} />} />
                {/* <Route path="/top-charts" element={<TopCharts />} /> */}
                <Route path="/top-charts" element={<AroundYou spotify={spotify} />} />
                <Route path="/artists/:id" element={<ArtistDetails artists={artists} spotify={spotify} />} />
                {/* <Route path="/songs/:songid" element={<SongDetails />} /> */}
                {/* <Route path="/search/:searchTerm" element={<Search />} /> */}
              </Routes>
            </div>
            <div className="xl:sticky relative top-0 h-fit ">
              <TopPlay data={releases} singer={artists} />
            </div>
          </div>
        </div>
        {playerState && (
        <div className="fixed p-5 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer CurrentPlaying={CurrentlyPlaying} spotify={spotify} />
        </div>
        )}
      </div>
      )}
    </>
  );
};

export default App;
