import React from 'react';
import { BsFillVolumeUpFill, BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import axios from 'axios';
import { useDataLayerValue } from '../../DataLayer';

const VolumeBar = ({ value, min, max, setVolumeBar }) => {
  const [{ token }] = useDataLayerValue();
  const setVolume = async (e) => {
    await axios.put(
      'https://api.spotify.com/v1/me/player/volume',
      {},
      {
        params: {
          volume_percent: parseInt(e, 10),
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };
  return (
    <div className="hidden lg:flex flex-1 items-center justify-end">
      {value <= 100 && value > 50 && <BsFillVolumeUpFill size={25} color="#FFF" onClick={() => setVolumeBar(0)} />}
      {value <= 50 && value > 0 && <BsVolumeDownFill size={25} color="#FFF" onClick={() => setVolumeBar(0)} />}
      {value === 0 && <BsFillVolumeMuteFill size={25} color="#FFF" onClick={() => setVolumeBar(100)} />}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          setVolume(e.target.value);
          setVolumeBar(e.target.value);
        }}
        className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
      />
    </div>
  );
};

export default VolumeBar;
