/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { Grid, Slider } from '@material-ui/core';
import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
// import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { useDataLayerValue } from '../../DataLayer';
// import { useDispatch, useSelector } from 'react-redux';

const MusicPlayer = ({ CurrentPlaying, spotify }) => {
  const { activeSong, currentSongs, currentIndex, isActive } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volumeBar, setVolumeBar] = useState(50);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [{ token, playerState, item, time }, dispatch] = useDataLayerValue();
  // eslint-disable-next-line no-console
  // console.log(item);
  // eslint-disable-next-line no-console, react/destructuring-assignment
  // console.log('Current playing from index.jsx file is ', CurrentPlaying);
  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      // eslint-disable-next-line no-console
      // console.log('Current playback state', r);
      dispatch({
        type: 'SET_PLAYER_STATE',
        playerState: r.is_playing,
      });
      dispatch({
        type: 'SET_TIME',
        time: r.progress_ms,
      });
      dispatch({
        type: 'SET_ITEM',
        item: r.item,
      });
    });
    // // eslint-disable-next-line react/destructuring-assignment
    // if (CurrentPlaying?.is_playing) {
    //   dispatch({
    //     type: 'SET_PLAYER_STATE',
    //     playerState: true,
    //   });
    // }
  }, [time]);

  const changeState = async () => {
    // const state = playerState ? 'pause' : 'play';
    // await axios.put(
    //   `https://api.spotify.com/v1/me/player/${state}`,
    //   {},
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // );
    // dispatch({
    //   type: 'SET_PLAYER_STATE',
    //   playerState: !playerState,
    // });
    if (playerState) {
      await spotify.pause();
      await dispatch({
        type: 'SET_PLAYER_STATE',
        playerState: false,
      });
    } else {
      await spotify.play();
      await dispatch({
        type: 'SET_PLAYER_STATE',
        playerState: true,
      });
    }
  };

  const skipNext = async () => {
    await dispatch({
      type: 'SET_PLAYER_STATE',
      playerState: false,
    });
    await spotify.skipToNext();
    await spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_ITEM',
        item: r.item,
      });
      dispatch({
        type: 'SET_PLAYER_STATE',
        playerState: true,
      });
      // eslint-disable-next-line no-console
      // console.log(r);
    });
  };

  const skipPrevious = async () => {
    await dispatch({
      type: 'SET_PLAYER_STATE',
      playerState: false,
    });
    await spotify.skipToPrevious();
    await spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_ITEM',
        item: r.item,
      });
      dispatch({
        type: 'SET_PLAYER_STATE',
        playerState: true,
      });
    });
  };

  // const changeTrack = async (type) => {
  //   await axios.post(
  //     `https://api.spotify.com/v1/me/player/${type}`,
  //     {},
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   );
  //   dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
  //   const response1 = await axios.get(
  //     'https://api.spotify.com/v1/me/player/currently-playing',
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     },
  //   );
  //   // eslint-disable-next-line no-console
  //   console.log('Response1 is ', response1);
  //   if (response1.data !== '') {
  //     // eslint-disable-next-line no-shadow
  //     const currentPlaying = {
  //       id: response1.data.item.id,
  //       name: response1.data.item.name,
  //       artists: response1.data.item.artists.map((artist) => artist.name).join(', '),
  //       image: response1.data.item.album.images[2].url,
  //     };
  //     dispatch({
  //       type: 'SET_ITEM',
  //       currentPlaying,
  //     });
  //   } else {
  //     dispatch({
  //       type: 'SET_CURRENTTRACK',
  //       currentPlaying: {
  //       },
  //     });
  //   }
  // };
  // eslint-disable-next-line no-console
  // console.log('Reducer component is ', currentPlaying);

  // const handlePlayPause = () => {
  //   if (!isActive) return;

  //   if (playerState) {
  //     dispatch(playPause(false));
  //   } else {
  //     dispatch(playPause(true));
  //   }
  // };

  // const handleNextSong = () => {
  //   dispatch(playPause(false));

  //   if (!shuffle) {
  //     dispatch(nextSong((currentIndex + 1) % currentSongs.length));
  //   } else {
  //     dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
  //   }
  // };

  // const handlePrevSong = () => {
  //   if (currentIndex === 0) {
  //     dispatch(prevSong(currentSongs.length - 1));
  //   } else if (shuffle) {
  //     dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
  //   } else {
  //     dispatch(prevSong(currentIndex - 1));
  //   }
  // };

  return (
    <div className="sm:px-12 px-8 w-full flex items-center justify-between relative">
      <Track
        spotify={spotify}
        CurrentPlaying={CurrentPlaying}
        playerState={playerState}
        isActive={isActive}
        activeSong={activeSong}
        // eslint-disable-next-line react/destructuring-assignment
        artists={CurrentPlaying?.item?.album?.artists.map((artist) => artist.name).join(', ') || 'Fetching Artists'}
        // eslint-disable-next-line react/destructuring-assignment
        imgUrl={CurrentPlaying?.item?.album?.images[0].url || ''}
        // eslint-disable-next-line react/destructuring-assignment
        name={CurrentPlaying?.item?.name || 'No active Song'}
      />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Controls
          playerState={playerState}
          isActive={isActive}
          repeat={repeat}
          setRepeat={setRepeat}
          shuffle={shuffle}
          setShuffle={setShuffle}
          currentSongs={currentSongs}
          changeState={changeState}
          skipNext={skipNext}
          skipPrevious={skipPrevious}
        />
        <Seekbar
          value={appTime}
          min={0}
          // eslint-disable-next-line no-unsafe-optional-chaining
          max={(item?.duration_ms) / 1000 || 0}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
          setAppTime={setAppTime}
        />
      </div>
      <VolumeBar value={volumeBar} min="0" max="100" onchange={(event) => setVolumeBar(event.target.value)} setVolumeBar={setVolumeBar} />
    </div>
  );
};

export default MusicPlayer;
