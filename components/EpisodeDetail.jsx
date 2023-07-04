import PodcastCard from "./PodcastCard";
import { useEffect, useState } from "react";
import styles from "../styles/PodcastDetail.module.sass";
import { useRouter } from "next/router";
import sanitizeHtml from "sanitize-html";
import Layout from "./Layout";
import useLocalStorage from "../hooks/useLocalStorage";

const EpisodeDetail = () => {
  const [episode, setEpisode] = useState({});
  const router = useRouter();
  const { id, trackId } = router.query;
  const [podcastSelected] = useLocalStorage(`podcast_${id}`, []);

  useEffect(() => {
    const episodeToRender = podcastSelected?.filter(
      (x) => x.trackId === parseInt(trackId)
    );
    setEpisode(episodeToRender[0]);
  }, [id, trackId]);

  const printDescriptionEpisode = (description) => {
    return sanitizeHtml(description);
  };

  return (
    <Layout title={"Episode Detail | Podcast"}>
      <div className={styles.podcastDetail__container}>
        <PodcastCard podcastId={id} />
        <section className={styles.podcast}>
          <h2>{episode?.trackName}</h2>
          <p id="episodeDescription">
            {printDescriptionEpisode(episode?.description)}
          </p>
          <audio
            className={styles.Podcastaudio__controls}
            src={episode?.episodeUrl}
            controls
          ></audio>
        </section>
      </div>
    </Layout>
  );
};
export default EpisodeDetail;
