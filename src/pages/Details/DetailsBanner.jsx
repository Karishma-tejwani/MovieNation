import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrap from "../../components/ContentWrap";
import LazyLoadImg from '../../components/lazyLoadImg';
import useFetch from '../../hooks/useFetch';
import Ratings from "../../components/Ratings";
import Genres from "../../components/Genres";
import poster from "../../assets/movie-poster.png";
import PlayButton from "./PlayButton";
import VideoPlay from "./VideoPlay";
import Cast from "./Cast";

const DetailsBanner = ({ video, crew }) => {

    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const {mediaType, id} = useParams();
    const {data, loading} = useFetch(`/${mediaType}/${id}`);
    const {url} = useSelector((state) => state.home);

    const _genres = data?.genres?.map((genre) => genre.id);

    // const director = crew?.filter((filt) => filt.job === "Director");
    // const writer = crew?.filter((filt) => filt.job === "Writer" || filt.job === "Story" || filt.job === "Screenplay");

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

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
                                            <div 
                                                className="playbtn" 
                                                onClick={() => {
                                                    setShow(true)
                                                    setVideoId(video.key)
                                                }}
                                            >
                                                <PlayButton />
                                                <div className="playtext">
                                                    Trailer
                                                </div>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">{data.overview}</div>
                                        </div>

                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="infoText bold">Status: {" "}</span>
                                                    <span className="infoText">{data.status}</span>
                                                </div>
                                            )}

                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="infoText bold">Release Date: {" "}</span>
                                                    <span className="infoText">{data.status}</span>
                                                </div>
                                            )}  

                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="infoText bold">Runtime: {" "}</span>
                                                    <span className="infoText">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* {director?.length > 0 && (
                                            <div className="info">
                                                <span className="infoText bold">Director: {" "}</span>
                                                <span className="infoText">
                                                    {director?.map((direct, index) => {
                                                        <span key={index}>
                                                            {direct.name}
                                                            {director.length - 1 !== index && ", "}
                                                        </span>
                                                    })}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="infoText bold">Writer: {" "}</span>
                                                <span className="infoText">
                                                    {writer?.map((write, index) => {
                                                        <span key={index}>
                                                            {write.name}
                                                            {console.log(write.name)}
                                                            {writer.length - 1 !== index && ", "}
                                                        </span>
                                                    })}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="infoText bold">Creator: {" "}</span>
                                                <span className="infoText">
                                                    {data?.created_by?.map((create, index) => {
                                                        <span key={index}>
                                                            {create.name}
                                                            {data?.created_by.length - 1 !== index && ", "}
                                                        </span>
                                                    })}
                                                </span>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                                <VideoPlay 
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
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