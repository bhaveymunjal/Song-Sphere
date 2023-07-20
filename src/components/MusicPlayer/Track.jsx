/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDataLayerValue } from '../../DataLayer';

const Track = ({ isPlaying, isActive, activeSong, name, imgUrl, artists, spotify }) => {
  const [{ token, item, playerState }, dispatch] = useDataLayerValue();
  useEffect(() => {
    const fetchItem = async () => {
      const r = await spotify.getMyCurrentPlayingTrack();
      dispatch({
        type: 'SET_ITEM',
        item: r.item,
      });
    };

    fetchItem();
  }, [playerState]);
  // eslint-disable-next-line no-console
  // console.log('current playing value from track component', currentPlaying);
  return (
    <div className="flex-1 flex items-center justify-start">
      <div className={`${playerState} ? animate-[spin_3s_linear_infinite] :hidden sm:block h-16 w-16 mr-4`}>
        <img src={item?.album?.images[0]?.url || ''} alt="cover art" className="rounded-full" />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {item?.name || 'No Active Song'}
        </p>
        <p className="truncate text-gray-300">
          {item?.artists.map((artist) => artist.name).join(', ') || 'No Artist'}
        </p>
      </div>
    </div>
  );
};

export default Track;
