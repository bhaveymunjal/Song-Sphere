/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import axios from 'axios';
import { useDataLayerValue } from '../DataLayer';

const PlayPause = ({ spotify, context_ur, track_num }) => {
  // eslint-disable-next-line no-console
  // console.log(data);
  // () => playTrack(data.track.uri, data.track.track_number)
  const [{ token }, dispatch] = useDataLayerValue();
  const playTrack = async (
    context_uri,
    track_number,
  ) => {
    const response = await axios.put(
      // eslint-disable-next-line no-underscore-dangle, react/no-this-in-sfc
      'https://api.spotify.com/v1/me/player/play',
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // eslint-disable-next-line no-console
    // console.log(response);
    if (response.status === 204) {
      // const currentPlaying = {
      //   id,
      //   name,
      //   artists,
      //   image,
      // };
      dispatch({ type: 'SET_ITEM', response });
      dispatch({
        type: 'SET_TIME',
        time: 0,
      });
      dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
    } else {
      dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
    }
  };
  // const playSong = (id) => {
  //   // eslint-disable-next-line no-console
  //   console.log(id);
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
  // eslint-disable-next-line no-console
  // console.log(songId);
  return (spotify?.title === track_num
    ? <FaPauseCircle size={35} className="text-gray-300 cursor-pointer" onClick={() => playTrack(context_ur, track_num)} />
    : <FaPlayCircle size={35} className="text-gray-300 cursor-pointer" onClick={() => playTrack(context_ur, track_num)} />
  );
};
export default PlayPause;
