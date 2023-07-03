import PropTypes from "prop-types";
import Link from "next/link";
import styles from "../styles/PodcastDetail.module.sass";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";

const PodcastCard = () => {
  const router = useRouter();
  const podcastId = router.query.id;
  const [podcast] = useLocalStorage('podcastSelected', []);

  return (
    podcast && (
      <section className={styles.podcast}>
        <div className={styles.podcast__img}>
          <Link href={`/podcast/${podcastId}`}>
            <Image src={podcast.img} alt={`imagen_ ${podcast.title}`} width={200} height={200}/>
          </Link>
        </div>
        <hr />
        <div className={styles.podcast__text}>
          <h4 className={styles.podcast__title}>
            <Link href={`/podcast/${podcastId}`}>{podcast.title}</Link>
          </h4>
          <span className={styles.podcast__author}>
            <i>
              {" "}
              by
              <Link href={`/podcast/${podcastId}`}> {podcast.author} </Link>
            </i>
          </span>
        </div>
        <hr />
        <div className={styles.podcast__text}>
          <h4>
            <b>Description:</b>
          </h4>
          <span>
            <i> {podcast.summary} </i>
          </span>
        </div>
      </section>
    )
  );
};
PodcastCard.propTypes = {
  podcast: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default PodcastCard;
