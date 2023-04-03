import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; //used for date format
import ContentWrap from "./ContentWrap";
import LazyLoadImg from "./lazyLoadImg";
import poster from "../assets/movie-poster.png";

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
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigationHandler("left")} />
                <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigationHandler("right")} />

                {!loading ? (
                    <div className="carouselItems">
                        {data?.map((itm) => {
                            const postUrl = itm.poster_path ? url.poster + itm.poster_path : poster;
                            return(
                                <div key={itm.id} className="carouselItem">
                                    <div className="posterBlock">  
                                        <LazyLoadImg src={postUrl} alt="Poster" />
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