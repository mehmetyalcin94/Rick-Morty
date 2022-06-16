import React from "react";
import styles from "./Search.module.scss";

const Search = ({ setSearch }) => {
  return (
    <form
      className={`${styles.search} d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-3`}
    >
      <input
        /**
         * Sets the search by input
         * @param {func} onChange Search
         */
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search Episode"
        className={styles.input}
        type="text"
      />
    </form>
  );
};

export default Search;
