/* eslint-disable no-console */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Controls from './Controls';
// import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';
import { useDataLayerValue } from '../../DataLayer';
// import { useDispatch, useSelector } from 'react-redux';

const MusicPlayer = ({ CurrentPlaying, spotify }) => {
  const { currentSongs, isActive } = useSelector((state) => state.player);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volumeBar, setVolumeBar] = useState(50);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [{ token, playerState, item, time, duration }, dispatch] = useDataLayerValue();
  const fetchItem = async () => {
    await spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_PLAYER_STATE',
        playerState: true,
      });
      dispatch({
        type: 'SET_ITEM',
        item: r.item,
      });
      dispatch({
        type: 'SET_TIME',
        time: r.progress_ms,
      });
      dispatch({
        type: 'SET_DURATION',
        duration: r.item.duration_ms,
      });
    });
  };
  useEffect(() => {
    fetchItem();
  }, [time]);
  const changeState = async () => {
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
        type: 'SET_PLAYER_STATE',
        playerState: true,
      });
      console.log(r);
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

  return (
    <div className="sm:px-12 px-8 w-full flex items-center justify-between relative">
      <Track
        spotify={spotify}
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
          spotify={spotify}
          value={appTime}
          min={0}
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
