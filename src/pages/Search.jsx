import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import api from "../utils/api";
import ContentWrap from "../components/ContentWrap";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Card from "../components/Card";

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
    setNum(1);
    fetchData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrap>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={num <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, ind) => {
                  if (item.media_type === "person") return;
                  return <Card key={ind} data={item} fromSearch={true} />;
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">No Results found!</span>
          )}
        </ContentWrap>
      )}
    </div>
  );
};

export default Search;
