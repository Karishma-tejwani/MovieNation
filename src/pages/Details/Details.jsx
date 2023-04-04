import React from "react";
import DetailsBanner from "./DetailsBanner";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Cast from "./Cast";
import OfficialVideos from "./OfficialVideos";
import SimilarVideos from "./SimilarVideos";
import Recommend from "./Recommend";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: LoadCredits } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={LoadCredits} />
      <OfficialVideos data={data} loading={loading} />
      <SimilarVideos mediaType={mediaType} id={id} />
      <Recommend mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
