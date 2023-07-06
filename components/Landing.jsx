"use client";
import { useEffect, useState } from "react";
import getPodcasts from "../api/getPodcasts";
import Home from "./Home";
import Layout from "./Layout";
import { formatDataList } from "../helpers/formatDatafromApi";
import useCache from "../hooks/useCache";
import { useLoader } from "../contexts/LoadingContext";
import { checkIf24hPassedToValidateInfo } from "../helpers/checkIf24hHasPassed";

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [podcastData, setPodcastData] = useCache("podcastData", []);
  const [_, setPodcastSelected] = useCache("podcastSelected", {});
  const { setLoadingState } = useLoader();

  useEffect(() => {
    const hasBeenPassed24Hours = checkIf24hPassedToValidateInfo(
      podcastData?.date ?? 0
    );
    if (hasBeenPassed24Hours) {
      setLoadingState(true);
      const getApiInfo = async () => {
        window.localStorage.clear();
        const response = await getPodcasts();
        const dataFormatted = {
          podcastData: formatDataList(response),
          date: Date.now(),
        };
        setData(dataFormatted.podcastData);
        setPodcastData(dataFormatted);
        setLoadingState(false);
      };
      getApiInfo();
    } else {
      setLoadingState(false);
      setData(podcastData.podcastData);
    }
  }, [podcastData, setPodcastData, setLoadingState]);

  // recive input value
  const handleSearch = (ev) => {
    setUserSearch(ev);
  };

  const handleUserSelect = (ev) => {
    const podcast = data.find((pod) => pod.id === ev);
    podcast && setPodcastSelected({ podcast, date: Date.now() });
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
