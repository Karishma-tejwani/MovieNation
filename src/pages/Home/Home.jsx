import React from 'react';
import HeroBanner from "./heroBanner";
import Discover from "./Discover";
import Popular from "./Popular";
import TopRated from './TopRated';

const Home = () => {
  return (
    <div className='home'>
      <HeroBanner />
      <Popular />
      <TopRated />
      <Discover />
    </div>
  )
}

export default Home