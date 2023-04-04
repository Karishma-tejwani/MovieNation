import React from 'react';
import HeroBanner from "./heroBanner";
import Trending from "./Trending";
import Popular from "./Popular";
import TopRated from './TopRated';

const Home = () => {
  return (
    <div className='home'>
      <HeroBanner />
      <Popular />
      <Trending />
      <TopRated />
    </div>
  )
}

export default Home