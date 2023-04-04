import React, { useState } from "react";
import ContentWrap from "../../components/ContentWrap";
import useFetch from "../../hooks/useFetch";
import Carousel from "../../components/Carousel";
import Switching from "../../components/Switching";

function Popular() {

    const [endpoint, setEndpoint] = useState("movie");
    const {data, loading} = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv" );
    }

    return(
        <div className="carouselSection">
            <ContentWrap>
                <span className="carouselTitle">
                    Popular
                </span>
                <Switching 
                    data = {["Movies", "TV Shows"]} 
                    onTabChange = {onTabChange}
                />
            </ContentWrap>
            <Carousel 
                data={data?.results} 
                loading={loading} 
                endpoint={endpoint}
            />
        </div>
    )
}

export default Popular;