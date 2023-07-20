/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

// const SongCard = ({ activeSong, isPlaying, song, id, data }) => {
const SongCard = ({ data, id, spotify }) => {
  // eslint-disable-next-line no-console
  // console.log(data.added_at);
  // eslint-disable-next-line no-console
  // console.log('Entire item - ', data);
  // eslint-disable-next-line no-console
  // console.log('Entire data - ', song);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-console
  // console.log('Data from SongCard', data);
  return (
    <div className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg ">
      <div className="relative w-full h-50 group">
        {/* <div className="absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex "> */}
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${spotify === data ? 'flex bg-black bg-opacity-70' : 'hidden'} `}>
          <PlayPause
            // isPlaying={isPlaying}
            // activeSong={activeSong}
            data={data}
            spotify={spotify}
            context_ur={data.track.album.uri}
            track_num={data.track.track_number}
          />
        </div>
        <img src={data?.track?.album?.images[0]?.url} alt="" />
      </div>
      <div className="flex mt-4 flex-col">
        <p className="font-semibold text-lg text-white truncate">
          {/* <Link to={`/songs/${data?.track?.id}`}> */}
          {data.track.name}
          {/* </Link> */}
        </p>
        <p className=" text-gray-300 truncate hover:underline">
          {/* <Link to={`/songs/${data?.track?.id}`}> */}
          {data.track.artists.map((t, index) => (
            <React.Fragment key={t.name}>
              <Link to={`/artists/${t.id}`}>
                {t.name}
              </Link>
              {index !== data.track.artists.length - 1 && ', '}
            </React.Fragment>
          ))}
          {/* </Link> */}
        </p>
      </div>
    </div>

  );
};
export default SongCard;