"use client";
import { useEffect, useState } from "react";
import getPodcasts from "../api/getPodcasts";
import Home from "./Home";
import Layout from "./Layout";
import { formatDataList } from "../helpers/formatDatafromApi";
import useCache from "../hooks/useCache";
import { useLoader } from "../contexts/LoadingContext";
import cacheService from "../api/cacheService";

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [podcastData, setPodcastData] = useCache("podcastData", []);
  const [_, setPodcastSelected] = useCache("podcastSelected", {});
  const { setLoadingState } = useLoader();

  useEffect(() => {

    if (podcastData.length === 0) {
      setLoadingState(true);
      const getApiInfo = async () => {
        cacheService.clear();
        const response = await getPodcasts();
        const dataFormatted = formatDataList(response);
        setData(dataFormatted);
        setPodcastData(dataFormatted);
        setLoadingState(false);
      };
      getApiInfo();
    } else {
      setLoadingState(false);
      setData(podcastData);
    }
  }, [podcastData, setPodcastData, setLoadingState]);

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
