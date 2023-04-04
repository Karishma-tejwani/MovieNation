import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrap from "../../components/ContentWrap";
import LazyLoadImg from '../../components/lazyLoadImg';
import useFetch from '../../hooks/useFetch';
import Ratings from "../../components/Ratings";
import Genres from "../../components/Genres";
import poster from "../../assets/movie-poster.png";
import PlayButton from "./PlayButton";

const DetailsBanner = ({ video, crew }) => {

    const {mediaType, id} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}`);
    const {url} = useSelector((state) => state.home);

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const _genres = data?.genres?.map((genre) => genre.id);

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <>
                            <div className="backdrop-img">
                                <LazyLoadImg src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrap>
                                <div className="content">
                                    <div className="leftBanner">
                                        {data.poster_path ? (
                                            <LazyLoadImg 
                                                src={url.backdrop + data.poster_path} 
                                                className="posterImg" 
                                            />
                                        ) : (
                                            <LazyLoadImg 
                                                src={poster} 
                                                className="posterImg" 
                                            />
                                        )}
                                    </div>
                                    <div className="rightBanner">
                                        <div className="rightTitle">
                                            {`${
                                                data.name || data.title
                                            } (${dayjs(
                                                data?.release_Date
                                                ).format("YYYY")})`}
                                        </div>
                                        <div className="rightSubTitle">
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres}/>
                                        <div className="row">
                                            <Ratings rating={data.vote_average.toFixed(1)} />
                                        </div>
                                        <div className="playbtn">
                                            <PlayButton />
                                            <div className="playtext">
                                                Trailer
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ContentWrap>
                        </>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrap>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrap>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;