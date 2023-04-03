import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import LazyLoadImg from '../../components/lazyLoadImg';
import ContentWrap from '../../components/ContentWrap';
import {GoSearch} from "react-icons/go"

const HeroBanner = () => {

  const [bg, setBg] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  
  const {data, loading} = useFetch("/movie/popular")

  const {url} = useSelector((state) => state.home);

  useEffect(()=>{
    const background = url.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    setBg(background);
  },[data])

  const searchHandler = (e) => {
    if(e.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className='heroBanner'>
      {!loading && <div className='image'>
        <LazyLoadImg src={bg} />
      </div>}
      <div className='layer'>

      </div>
      <ContentWrap>
        <div className='content'>
          <span className='title'>Welcome.</span>
          <span className='subTitle'>Countless movies, TV shows, and people waiting to be explored.</span>
          <div className='search'>
            <input 
              type='text' 
              placeholder='Search here'
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchHandler}  
            />
            <button className='heroBtn'><GoSearch style={{fontSize:30}} /></button>
          </div>
        </div>
      </ContentWrap>
    </div>
  )
}

export default HeroBanner;