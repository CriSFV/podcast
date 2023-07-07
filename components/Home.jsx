import styles from "../styles/Home.module.sass";
import List from "./List";

const Home = ({handleSearch, handleUserSelect, data}) => {
  const userSearch = (ev) => {
    ev.preventDefault();
    handleSearch(ev.target.value);
  };
  return (
    <>
      <section className={styles.searcher}>
        <span
          id="list-counter"
          data-testid="list-counter"
          className={`${
            data?.length > 0 ? styles.searcher__results : ""
          } flex_column_center`}
        >
          {data?.length > 0 ? data?.length : ""}
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
      <List data={data} handleUserSelect={handleUserSelect} />
    </>
  );
};
export default Home;
