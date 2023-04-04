import React from 'react'
import DetailsBanner from './DetailsBanner'
import useFetch from '../../hooks/useFetch';
import { useParams } from "react-router-dom";

const Details = () => {

  const {mediaType, id} = useParams();
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: LoadCredits} = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner 
        video={data?.results?.[0]} 
        crew={credits?.crew}
      />
    </div>
  )
}

export default Details