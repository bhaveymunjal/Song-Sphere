/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import axios from 'axios';
import { useDataLayerValue } from '../DataLayer';

const PlayPause = ({ spotify, context_ur, track_num, duration }) => {
  const [{ token }, dispatch] = useDataLayerValue();
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
  const playTrack = async (context_uri, track_number) => {
    const response = await axios.put(
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
    if (response.status === 204) {
      await fetchItem();
    } else {
      dispatch({ type: 'SET_PLAYER_STATE', playerState: true });
    }
  };

  return (spotify?.title === track_num
    ? <FaPauseCircle size={35} className="text-gray-300 cursor-pointer" onClick={() => playTrack(context_ur, track_num)} />
    : <FaPlayCircle size={35} className="text-gray-300 cursor-pointer" onClick={() => playTrack(context_ur, track_num)} />
  );
};
export default PlayPause;
