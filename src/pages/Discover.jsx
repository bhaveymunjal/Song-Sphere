/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useDataLayerValue } from '../DataLayer';

const Discover = (data, { spotify }) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (data === null || data.data.length === 0) {
    return <div><Loader /></div>;
  }
  const [{ token }, dispatch] = useDataLayerValue();
  window.onSpotifyWebPlaybackSDKReady = () => {
    const tokens = token;
    const player = new spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb) => { cb(tokens); },
      volume: 0.5,
    });
    player.addListener('ready', ({ device_id }) => {
    });
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
    player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
      console.error(message);
    });
    player.connect();
  };
  const dataArray = Object.values(data)[0];
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-left text-white">
          Discover Here
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {dataArray.map((item, id) => (
          <SongCard
            key={id}
            data={item}
            isPlaying={isPlaying}
            activeSong={activeSong}
            id={id}
            spotify={spotify}
          />
        ))}
      </div>
    </div>
  );
};
export default Discover;
