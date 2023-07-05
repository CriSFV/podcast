"use client";
import { useEffect, useState, useContext } from "react";
import getPodcasts from "../api/getPodcasts";
import Home from "./Home";
import Layout from "./Layout";
import { formatDataList } from "../helpers/formatDatafromApi";
import useLocalStorage from "../hooks/useLocalStorage";
import { useLoader } from "../contexts/LoadingContext";


function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [date, setDate] = useLocalStorage("date", 0);
  const [podcastData, setPodcastData] = useLocalStorage("podcastData",[]);
  const [_, setPodcastSelected] = useLocalStorage("podcastSelected", []);
  const { setLoadingState } = useLoader();
  
  const checkIf24hPassedToValidateInfo = (date) => {
    const twentyFourHours = 60 * 60 * 24 * 1000;
    return Date.now() - date >= twentyFourHours
  }
  useEffect(() => {
    const hasBeenPassed24Hours = checkIf24hPassedToValidateInfo(date)
    if (hasBeenPassed24Hours) {
    
      setLoadingState(true);
      const getApiInfo = async ()=>{
        window.localStorage.clear();
        const response = await getPodcasts()
        const dataFormatted = formatDataList(response);
        setData(dataFormatted);
        setDate(Date.now());
        setPodcastData(dataFormatted);
        setLoadingState(false);
      }
      getApiInfo()
    } else {
      setLoadingState(false);
      setData(podcastData);
    }
  }, []);

  // recive input value
  const handleSearch = (ev) => {
    setUserSearch(ev);
  };

  const handleUserSelect = (ev) => {
    const podcast = data.find((pod) => pod.id === ev);
    podcast && setPodcastSelected(podcast);
  };

  const podcastFiltered =
    userSearch === ""
      ? data
      : data?.filter(
          (podcast) =>
            podcast.title
              .toLocaleLowerCase()
              .includes(userSearch.toLocaleLowerCase()) ||
            podcast.author
              .toLocaleLowerCase()
              .includes(userSearch.toLocaleLowerCase())
        );

  return (
    <Layout>
      <div className="ppal_container">
        <Home
          data={podcastFiltered}
          handleSearch={handleSearch}
          handleUserSelect={handleUserSelect}
        />
      </div>
    </Layout>
  );
}

export default App;
