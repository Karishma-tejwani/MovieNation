import React, { useState } from "react";
import ContentWrap from "../../components/ContentWrap";
import useFetch from "../../hooks/useFetch";
import Carousel from "../../components/Carousel";
import Switching from "../../components/Switching";

function Discover() {

    const [endpoint, setEndpoint] = useState("day");
    const {data, loading} = useFetch(`/trending/movie/${endpoint}`);

    // const onTabChange = (tab) => {
    //     setEndpoint(tab === "Day" ? "day" : "week" );
    // }

    return(
        <div className="carouselSection">
            <ContentWrap>
                <span className="carouselTitle">
                    Discover
                </span>
                {/* <Switching 
                    data = {["Day", "Week"]} 
                    onTabChange = {onTabChange}
                /> */}
            </ContentWrap>
            <Carousel data={data?.results} loading={loading}/>
        </div>
    )
}

export default Discover;