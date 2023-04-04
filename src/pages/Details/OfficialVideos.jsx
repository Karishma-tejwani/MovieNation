import React, { useState } from "react";
import ContentWrap from "../../components/ContentWrap";
import LazyLoadImg from '../../components/lazyLoadImg';
import PlayButton from "./PlayButton";
import VideoPlay from "./VideoPlay";

const OfficialVideos = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrap>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        Videos data...
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrap>
            <VideoPlay
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default OfficialVideos;