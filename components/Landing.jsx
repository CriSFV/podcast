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
  const [date, setDate, removeDate] = useLocalStorage("date", 0);
  const [podcastData, setPodcastData, removePodcastData] = useLocalStorage("podcastData",[]);
  const [podcastSelected, setPodcastSelected, removePodcastSelected] = useLocalStorage("podcastSelected", []);
  const { setLoadingState } = useLoader();

  useEffect(() => {
    // check if more than one day has passed, if it's less than a day, get data from localStorage

    if (Date.now() - date >= 86400000) {
      setLoadingState(true);
      getPodcasts().then((response) => {
        setLoadingState(false);
        const dataFormatted = formatDataList(response);
        setData(dataFormatted);
        removeDate();
        setDate(Date.now());
        removePodcastData();
        setPodcastData(dataFormatted);
      });
    } else {
      setLoadingState(false);
      setData(podcastData);
    }
  }, []);

  // recive input value
  const handleSearch = (ev) => {
    setUserSearch(ev);
  };
  // receive podcast user selection
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
