import React, { useState } from "react";
import ContentWrap from "../../components/ContentWrap";
import useFetch from "../../hooks/useFetch";
import Carousel from "../../components/Carousel";

function Trending() {

    const [endpoint, setEndpoint] = useState("day");
    const {data, loading} = useFetch(`/trending/movie/${endpoint}`);

    return(
        <div className="carouselSection">
            <ContentWrap>
                <span className="carouselTitle">
                    Trending
                </span>
            </ContentWrap>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending;