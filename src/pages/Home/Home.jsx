import React from 'react';
import HeroBanner from "./heroBanner";
import Trending from "./Trending";

const Home = () => {
  return (
    <div className='home'>
      <HeroBanner />
      <Trending />
      <div style={{height:1000}}></div>
    </div>
  )
}

export default Home