import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "../utils/api";
import ContentWrap from "../components/ContentWrap";
import notFound from "../assets/not-found.png";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const Search = () => {
  const [data, setData] = useState(null);
  const [num, setNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchData = () => {
    setLoading(true);
    api(`/search/multi?query=${query}&page=${num}`).then((res) => {
      setData(res);
      setNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    setLoading(true);
    api(`/search/multi?query=${query}&page=${num}`).then((res) => {
      if (data?.results) {
        setData({ ...data, results: [...data?.results, ...res.results] });
      } else {
        setData(res);
      }
      setNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return <div className="searchResultsPage">Search</div>;
};

export default Search;
