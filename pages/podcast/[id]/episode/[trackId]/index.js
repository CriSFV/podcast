import { useRouter } from 'next/router'
import EpisodeDetail from "../../../../../components/EpisodeDetail"
import { useState } from "react"




export default function EpisodePage (){
  const router = useRouter()
  const { id, trackId }= router.query
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (ev) =>{
    setIsLoading(ev);
  }
  return (
      <EpisodeDetail id={id} trackId={trackId} handleLoading={handleLoading}/>
  )
}