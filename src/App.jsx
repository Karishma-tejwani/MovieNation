import { useEffect } from 'react';
import api from './utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from './pages/Home/Home';
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import "./styles/Style.scss";

function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home);

  useEffect(()=>{
    fetchApi();
    genres();
  },[])

  const fetchApi = () => {
    api("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    })
  }

  const genres = async () => {
    let promise = [];
    let endpoints = ["tv", "movie"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promise.push(api(`/genre/${url}/list`));
    });

    const data = await Promise.all(promise);
    data.map(({genre}) => {
      return genre.map((itm) => (allGenres[itm.id] = itm));
    });
  }

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:mediaType/:id' element={<Details />} />
      <Route path='/search/:query' element={<Search />} />
      <Route path='/explore/:mediaType' element={<Explore />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App
