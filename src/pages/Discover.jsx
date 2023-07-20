/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useDataLayerValue } from '../DataLayer';

// import { useGetTopChartsQuery } from '../redux/services/Spotify';

const Discover = (data, { spotify }) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (data === null || data.data.length === 0) {
    return <div><Loader /></div>;
  }
  // eslint-disable-next-line no-empty-pattern
  const [{ token }, dispatch] = useDataLayerValue();
  // eslint-disable-next-line no-console
  // console.log((data));
  window.onSpotifyWebPlaybackSDKReady = () => {
    const tokens = token;
    const player = new spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb) => { cb(tokens); },
      volume: 0.5,
    });
    player.addListener('ready', ({ device_id }) => {
      // eslint-disable-next-line no-console
      console.log('Ready with Device ID', device_id);
    });
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      // eslint-disable-next-line no-console
      console.log('Device ID has gone offline', device_id);
    });
    player.addListener('initialization_error', ({ message }) => {
      // eslint-disable-next-line no-console
      console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
      // eslint-disable-next-line no-console
      console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
      // eslint-disable-next-line no-console
      console.error(message);
    });
    player.connect();
  };
  const dataArray = Object.values(data)[0];
  // eslint-disable-next-line no-console
  // console.log('Data Array ', dataArray);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  // eslint-disable-next-line consistent-return
  // const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = 'Pop';
  // eslint-disable-next-line no-console
  // console.log('Response - ', data);
  // if (isFetching) return <Loader title="Loading Songs......." />;
  // if (error) return <Error />;
  // if (!data) {
  //   return 'Data cannot be fetched';
  // }
  // const playSong = (id) => {
  //   // eslint-disable-next-line no-console
  //   // console.log(id);
  //   spotify.play({
  //     uris: [`spotify:track:${id}`],
  //   })
  //     .then((res) => {
  //       spotify.getMyCurrentPlayingTrack()
  //         .then((r) => {
  //           dispatch({
  //             type: 'SET_ITEM',
  //             item: r.item,
  //           });
  //           dispatch({
  //             type: 'SET_PLAYER_STATE',
  //             playerState: true,
  //           });
  //         })
  //         .catch((error) => {
  //           // eslint-disable-next-line no-console
  //           console.error('Error occurred while getting current playing track:', error);
  //           // Handle the error appropriately
  //         });
  //     })
  //     .catch((error) => {
  //       // eslint-disable-next-line no-console
  //       console.error('Error occurred while playing the song:', error);
  //       // Handle the error appropriately
  //     });
  // };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-left text-white">
          Discover Here
        </h2>
        {/* <select
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
        </select> */}
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {dataArray.map((item, id) => (
        // {dataArray.map((item, id) => (
          <SongCard
            key={id}
            data={item}
            // song={dataArray}
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
