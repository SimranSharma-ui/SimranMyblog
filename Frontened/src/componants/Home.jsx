import React from 'react';
import Hero from '../Home/Hero';
import Trending from '../Home/Trending';
import Cartoon from '../Home/Cartoon';
import Creator from '../Home/Creator';
import Anime from '../Home/Anime';

const Home = () => {
  return (
    <div>
      <Hero/>
      <Trending/>
      <Cartoon/>
      <Anime/>
      <Creator/>
      
    </div>
  )
}

export default Home;