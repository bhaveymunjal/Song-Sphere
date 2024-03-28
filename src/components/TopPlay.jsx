/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import TopChartCard from './TopChartCard';
import PlayPause from './PlayPause';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/free-mode';

const TopPlay = (data, spotify) => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);
  // eslint-disable-next-line no-console
  // console.log((data));
  const dataArray = Object.values(data)[0];
  const artist = Object.values(data)[1];
  // eslint-disable-next-line no-console
  // console.log((dataArray));

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 mt-5 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between">
          <h2 className="text-white font-bold">Top Albums</h2>
        </div>

        <div className="mt-4 flex flex-4 gap-1 flex-col">
          {dataArray.slice(0, 5).map((song, id) => (
            <TopChartCard data={song} id={id} key={id} spotify={spotify} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between">
          <h2 className="text-white font-bold">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer hover:underline">See More</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {artist.map((song, id) => (
            <SwiperSlide
              key={id}
              style={{ width: '25%', height: 'auto' }}
              className="rounded-full animate-slideright"
            >
              <Link to={`/artists/${song.id}`}>
                <img src={song.images[0].url} alt="" className="rounded-full w-[100px] h-[100px] object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
