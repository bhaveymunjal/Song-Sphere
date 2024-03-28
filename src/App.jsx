/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover } from './pages';
import HomePage from './components/HomePage';
import { getTokenFromUrl } from './redux/services/Sp';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();
const App = () => {
  const [{ token, playlists, releases, artists, relatedArtist, CurrentlyPlaying }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });
      spotify.getPlaylist('37i9dQZEVXbLZ52XmnySJg').then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: (playlists.tracks.items),
        });
      });
      spotify.getArtists(['4PULA4EFzYTrxYvOVlwpiQ', '6DARBhWbfcS9E4yJzcliqQ', '3OQRPFFS3OsltFjFAXu1kE', '3lmszXxkp47K9kDCRRPU8p', '4YRxDV8wJFPHPTeXepOstw', '6pU5oz09VUYtnFTd4P1Mxn', '4Ai0pGz6GhQavjzaRhPTvz']).then((artists) => {
        dispatch({
          type: 'SET_ARTISTS',
          artists: artists.artists,
        });
      });
      spotify.getNewReleases().then((releases) => {
        dispatch({
          type: 'SET_RELEASES',
          releases: releases.albums.items,
        });
        dispatch({
          type: 'SET_CHARTS',
          charts: releases,
        });
      });
      spotify.getArtistRelatedArtists('4PULA4EFzYTrxYvOVlwpiQ').then((relatedArtist) => {
        dispatch({
          type: 'SET_RELATEDARTISTS',
          relatedArtist: relatedArtist.artists,
        });
      });
      spotify.getMyCurrentPlayingTrack().then((track) => {
        dispatch({
          type: 'SET_CURRENTTRACK',
          CurrentlyPlaying: track,
        });
      });
      spotify.getMyDevices().then((device) => {
        dispatch({
          type: 'SET_DEVICES',
          devices: device,
        });
      });
    }
  }, []);

  return (
    <>
      {!token && (<HomePage />) }
      {token && (
      <div className="relative flex">
        <Sidebar />
        <div className="h-screen flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
          <div className="px-6 overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
            <div className="flex-1 h-fit ">
              <Routes>
                <Route path="/" element={<Discover data={playlists} spotify={spotify} />} />
                <Route path="/top-artists" element={<TopArtists relatedArtist={relatedArtist} />} />
                <Route path="/top-charts" element={<AroundYou spotify={spotify} />} />
                <Route path="/artists/:id" element={<ArtistDetails artists={artists} spotify={spotify} />} />
              </Routes>
            </div>
            <div className="xl:sticky relative top-0 h-fit">
              <TopPlay data={releases} singer={artists} />
            </div>
          </div>
        </div>
        {/* <div className="h-[14vh] fixed p-5 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg z-10">
          <MusicPlayer CurrentPlaying={CurrentlyPlaying} spotify={spotify} />
        </div> */}
      </div>
      )}
    </>
  );
};

export default App;
