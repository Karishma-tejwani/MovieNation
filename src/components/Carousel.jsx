import React, { useRef } from "react";
import {
    BiLeftArrowAlt,
    BiRightArrowAlt,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; //used for date format
import ContentWrap from "./ContentWrap";
import LazyLoadImg from "./lazyLoadImg";
import poster from "../assets/movie-poster.png";
import Ratings from "./Ratings";

const Carousel = ({data, loading}) => {

    //get reference of every div
    const carouselCont = useRef();
    const {url} =  useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigationHandler = (direction) => {

    }

    const skeletonItem = () => {
        return(
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="carousel">
            <ContentWrap>
                <BiLeftArrowAlt className="leftArrow arrow" onClick={() => navigationHandler("left")} />
                <BiRightArrowAlt className="RightArrow arrow" onClick={() => navigationHandler("right")} />

                {!loading ? (
                    <div className="carouselItems">
                        {data?.map((itm) => {
                            const postUrl = itm.poster_path ? url.poster + itm.poster_path : poster;
                            return(
                                <div key={itm.id} className="carouselItem">
                                    <div className="posterBlock">  
                                        <LazyLoadImg src={postUrl} alt="Poster" />
                                        <Ratings rating={itm.vote_average.toFixed(1)} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {itm.title || itm.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(itm.release_Date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>
                            )
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
    )
}

export default Carousel;