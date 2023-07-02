import styles from "../styles/Home.module.sass";
import List from "./List";

const Home = (props) => {
  const userSearch = (ev) => {
    ev.preventDefault();
    props.handleSearch(ev.target.value);
  };
  const handleUserSelect = (ev) => {
    props.handleUserSelect(ev);
  };
  return (
    <>
      <section className={styles.searcher}>
        <span
          id="list-counter"
          data-testid="list-counter"
          className={`${
            props.data.length > 0 ? styles.searcher__results : ""
          } flex_column_center`}
        >
          {props.data.length > 0 ? props.data.length : ""}
        </span>
        <form action="">
          <label htmlFor="search" />
          <input
            id="search"
            className={styles.searcher__input}
            type="text"
            placeholder="Filter podcast"
            onKeyUp={userSearch}
          />
        </form>
      </section>
      <List data={props.data} handleUserSelect={handleUserSelect} />
    </>
  );
};
export default Home;
