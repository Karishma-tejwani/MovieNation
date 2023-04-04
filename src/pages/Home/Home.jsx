import React from 'react';
import HeroBanner from "./heroBanner";
import Trending from "./Trending";
import Popular from "./Popular";

const Home = () => {
  return (
    <div className='home'>
      <HeroBanner />
      <Popular />
      <Trending />
      <div style={{height:1000}}></div>
    </div>
  )
}

export default Home