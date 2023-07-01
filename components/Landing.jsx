// import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import getPodcasts from "../api/getPodcasts";
import store from "../api/store";
import Home from "./Home";
import Layout from "./Layout";
import { formatDataList } from "../helpers/formatDatafromApi";

function App() {
  const [data, setData] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // check if more than one day has passed, if it's less than a day, get data from localStorage

    const date = store.get("date", "");
    if (Date.now() - date >= 86400000) {
      setIsLoading(true);
      getPodcasts().then((response) => {
        setIsLoading(false);
        const dataFormatted = formatDataList(response);
        setData(dataFormatted);
        store.clear();
        store.set("date", Date.now());
        store.set("podcastData", dataFormatted);
      });
    } else {
      setIsLoading(false);
      setData(store.get("podcastData", []));
    }
  }, []);

  // recive input value
  const handleSearch = (ev) => {
    setUserSearch(ev);
  };
  // receive podcast user selection
  const handleUserSelect = (ev) => {
    const podcast = data.find((pod) => pod.id === ev);
    podcast && store.set("podcastSelected", podcast);
  };

  const podcastFiltered =
    userSearch === ""
      ? data
      : data.filter(
          (podcast) =>
            podcast.title
              .toLocaleLowerCase()
              .includes(userSearch.toLocaleLowerCase()) ||
            podcast.author
              .toLocaleLowerCase()
              .includes(userSearch.toLocaleLowerCase())
        );

  return (
    <Layout isLoading={isLoading}>
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
