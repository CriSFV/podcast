import PodcastCard from "./PodcastCard";
import cache from "../api/store";
import { useEffect, useState } from "react";
import styles from "../styles/PodcastDetail.module.sass";
import { useRouter } from "next/router";
import sanitizeHtml from 'sanitize-html';
import Layout from "./Layout";

const EpisodeDetail = () => {
  const [episode, setEpisode] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id, trackId } = router.query;

  useEffect(() => {
    const episodeToRender = cache.get(`podcast_${id}`)
      ? cache
          .get(`podcast_${id}`)
          .filter((x) => x.trackId === parseInt(trackId))
      : "";
    setEpisode(episodeToRender[0]);
    setLoading(false);
  }, [id, trackId]);

  const printDescriptionEpisode = (description) => {
    return sanitizeHtml(description);
  };

  return (
    <Layout isLoading={loading} title={'Episode Detail | Podcast'}>
    <div className={styles.podcastDetail__container}>
      <PodcastCard podcastId={id} />
      <section className={styles.podcast}>
        <h2>{episode ? episode.trackName : ""}</h2>
        <p id="episodeDescription">
          {printDescriptionEpisode(episode ? episode.description : "")}
        </p>
        <audio
          className={styles.Podcastaudio__controls}
          src={episode ? episode.episodeUrl : ""}
          controls
        ></audio>
      </section>
    </div>
    </Layout>
  );
};
export default EpisodeDetail;
