// import PropTypes from "prop-types";
import Link from "next/link";
import styles from "../styles/List.module.sass";

const List = (props) => {
  const selectPodcast = (ev) => {
    props.handleUserSelect(ev.currentTarget.id);
  };
  const printList = () => {
    return props.data.map((podcast) => {
      return (
        <li key={podcast.id} id={podcast.id} onClick={selectPodcast}>
          <Link
            href={`/podcast/${podcast.id}`}
            className={styles.list__podcast}
          >
            <img
              className={styles.list__podcast__img}
              src={podcast.img}
              alt={`imagen_ ${podcast.title}`}
            />
            <div
              className={`${styles.list__podcast__text} ${styles.flex_column_space} text__center`}
            >
              <h6 className={`${styles.list__podcast__text__title}`}>
                {podcast.title}
              </h6>
              <span className={`${styles.list__podcast__text__author}`}>
                Author: {podcast.author}
              </span>
            </div>
          </Link>
        </li>
      );
    });
  };
  return (
    <section>
      <ul className={styles.list}>{printList()}</ul>
    </section>
  );
};

export default List;
