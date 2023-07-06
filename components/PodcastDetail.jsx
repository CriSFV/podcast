import styles from "../styles/PodcastDetail.module.sass";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import getPodcastDetail from "../api/getPodcastDetail";
import Layout from "./Layout";
import { formatPodcastDetail } from "../helpers/formatDatafromApi";
import PodcastCard from "./PodcastCard";
import useCache from "../hooks/useCache";
import { useLoader } from "../contexts/LoadingContext";
import {checkIf24hPassedToValidateInfo} from "../helpers/checkIf24hHasPassed";
import cacheService from "../api/cacheService";

const PodcastDetail = () => {
  const [podcastToRender, setPodcastToRender] = useState([]);
  const router = useRouter();
  const podcastId = router.query.id;
  const [podcastList, setPodcastList, removePodcastList] = useCache(`podcast_${podcastId}`, [] );
  const [podcast] = useCache('podcastSelected', {});

  const {loading, setLoadingState } = useLoader();

  useEffect(() => {
    const hasBeenPassed24Hours = checkIf24hPassedToValidateInfo(podcastList?.date ?? 0)
    if (podcastList?.length === 0 || hasBeenPassed24Hours) {
      setLoadingState(true);
      removePodcastList(`podcast_${podcastId}`)
      getPodcastDetail(podcastId).then((resp) => {
        const data = formatPodcastDetail(resp);
        setPodcastToRender(data);
        podcastId && setPodcastList({data, date: Date.now()});
        setLoadingState(false);
      });
    } else {
      
      setPodcastToRender(podcastList.data);
      setLoadingState(false);
    }
  }, [podcastId, setLoadingState, setPodcastList, podcastList, removePodcastList]);

  const convertTime = (seconds) => {
    let hour = Math.floor(seconds / 3600);
    hour = hour < 10 ? "0" + hour : hour;
    let minute = Math.floor((seconds / 60) % 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = seconds % 60;
    second = second < 10 ? "0" + second : second;
    return hour + ":" + minute + ":" + second;
  };

  const printTable = () => {
    return podcastToRender && podcastToRender?.map((episode) => {
      if (episode.wrapperType === "podcastEpisode") {
        const episodeDate = new Date(episode.releaseDate);
        const time = episode.trackTimeMillis / 1000;
        return (
          <tr
            key={episode.trackId}
            id={episode.trackId}
            className={styles.table_tr}
          >
            <td>
              <Link
                href={`/podcast/${podcastId}/episode/${episode.trackId}`}
                className="list-decoration-none"
              >
                {episode.trackName}
              </Link>
            </td>
            <td>{episodeDate.toLocaleDateString()}</td>
            <td>{convertTime(time)}</td>
          </tr>
        );
      }
      return "";
    });
  };

  return (
    <Layout title={"Episodes | Podcast"}>
      <div className={styles.podcastDetail__container}>
        <PodcastCard podcastId={podcastId} podcast={podcast.podcast}/>
        {!loading && <section>
          <h2 className={`box-shadow ${styles.detail__episodes}`}>
            Episodes:{" "}
            {podcastToRender?.length ? podcastToRender.length - 1 : "-"}{" "}
          </h2>
          <table className={`box-shadow ${styles.detail__table}`}>
            <thead>
              <tr>
                <th>
                  <b>Title</b>
                </th>
                <th>
                  <b>Date</b>
                </th>
                <th>
                  <b>Duration</b>
                </th>
              </tr>
            </thead>
            <tbody>{printTable()}</tbody>
          </table>
        </section>}
      </div>
    </Layout>
  );
};

export default PodcastDetail;
