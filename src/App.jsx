import { useState, useEffect } from 'react'
import api from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from './store/homeSlice'

function App() {
  const dispatch = useDispatch()
  const {url} = useSelector((state) => state.home);

 useEffect(()=>{
  apiCalling();
 },[])

const apiCalling = () => {
  api("/movie/popular").then((res) => {
    dispatch(getApiConfiguration(res))
  })
}

  return (
    <div>
      {url?.total_pages}
    </div>
  )
}

export default App
