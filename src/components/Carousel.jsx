import React, { useRef } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; //used for date format
import ContentWrap from "./ContentWrap";
import LazyLoadImg from "./lazyLoadImg";
import poster from "../assets/movie-poster.png";
import Ratings from "./Ratings";
import Genres from "./Genres";

const Carousel = ({ data, loading, endpoint, title }) => {
  //carousel container will get reference of carousel Items
  const carouselCont = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigationHandler = (direction) => {
    const cont = carouselCont.current;

    const scroll =
      direction === "left"
        ? cont.scrollLeft - (cont.offsetWidth + 20)
        : cont.scrollLeft + (cont.offsetWidth + 20);

    cont.scrollTo({
      left: scroll,
      behavior: "smooth",
    });
  };

  const skeletonItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrap>
        {title && <div className="carouselTitle">{title}</div>}
        <BiLeftArrowAlt
          className="leftArrow arrow"
          onClick={() => navigationHandler("left")}
        />
        <BiRightArrowAlt
          className="RightArrow arrow"
          onClick={() => navigationHandler("right")}
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselCont}>
            {data?.map((itm) => {
              const postUrl = itm.poster_path
                ? url.poster + itm.poster_path
                : poster;
              return (
                <div
                  key={itm.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${itm.media_type || endpoint}/${itm.id}`)
                  }
                >
                  <div className="posterBlock">
                    <LazyLoadImg src={postUrl} alt="Poster" />
                    <Ratings rating={itm.vote_average.toFixed(1)} />
                    <Genres data={itm.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{itm.title || itm.name}</span>
                    <span className="date">
                      {dayjs(itm.release_Date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
            {skeletonItem()}
          </div>
        )}
      </ContentWrap>
    </div>
  );
};

export default Carousel;
