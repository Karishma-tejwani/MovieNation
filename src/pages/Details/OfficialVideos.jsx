import React, { useState } from "react";
import ContentWrap from "../../components/ContentWrap";
import LazyLoadImg from "../../components/lazyLoadImg";
import PlayButton from "./PlayButton";
import VideoPlay from "./VideoPlay";
import avatar from "../../assets/avatar.png";

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
            {data?.results?.map((video) => {
              return (
                <>
                  <div
                    key={video.id}
                    className="videoItem"
                    onClick={() => {
                      setVideoId(video.key);
                      setShow(true);
                    }}
                  >
                    <div className="videoThumbnail">
                      <LazyLoadImg
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                      />
                      <PlayButton />
                    </div>
                  </div>
                </>
              );
            })}
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
