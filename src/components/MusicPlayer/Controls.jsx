/* eslint-disable quotes */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';

const Controls = ({ playerState, repeat, setRepeat, shuffle, setShuffle, changeState, skipPrevious, skipNext, dispatch, spotify }) => {
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const r = await spotify.getMyCurrentPlayingTrack();
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
      } catch (error) {
        console.error("Error fetching current playing track:", error);
      }
    };

    // Call the fetchItem function when the component mounts
    fetchItem();
  }, []); // Include the dependencies in the array

  return (
    <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat size={20} color={repeat ? 'red' : 'white'} onClick={() => setRepeat((prev) => !prev)} className="hidden sm:block cursor-pointer" />
      <MdSkipPrevious size={30} color="#FFF" className="cursor-pointer" onClick={skipPrevious} />
      {playerState ? (
        <BsFillPauseFill size={45} color="#FFF" onClick={changeState} className="cursor-pointer" />
      ) : (
        <BsFillPlayFill size={45} color="#FFF" onClick={changeState} className="cursor-pointer" />
      )}
      <MdSkipNext size={30} color="#FFF" className="cursor-pointer" onClick={skipNext} />
      <BsShuffle size={20} color={shuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" />
    </div>
  );
};

export default Controls;
