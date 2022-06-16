import React from "react";
import { Link } from "react-router-dom";

import styles from "./Cards.module.scss";

const Cards = ({
  filtered,
  chars,
  status,
  species,
  gender,
  setStatus,
  setSpecies,
  setGender,
}) => {
  /**
   * a func to clear filters
   */
  const clear = () => {
    setStatus("");
    setSpecies("");
    setGender("");
    window.location.reload(false);
  };

  /**
   * Listing character cards according to filters
   */
  if (filtered.length > 0) {
    return (
      <div className="container">
        <div className="row">
          {filtered.map((chars) => (
            /**
             * Clicking on the cards takes us to Character Details page
             */
            <Link
              style={{ textDecoration: "none" }}
              to={`/character/${chars.data.id}`}
              key={chars.data.id}
              className="col-lg-4 col-md-6 col-12 mb-3 position-relative"
            >
              <div
                className={`${styles.card} card bg-light d-flex flex-column justify-content-center`}
              >
                <img
                  className={`${styles.img} img-fluid`}
                  src={chars.data.image}
                  alt=""
                />
                <div className="card-body">
                  <div className="card-title mb-4 text-dark">
                    <h5>{chars.data.name}</h5>
                  </div>
                  <div className="card-text text-secondary">
                    Last Location: {chars.data.location.name}
                  </div>
                </div>
              </div>

              {(() => {
                /**
                 * According to character's status badge color changes
                 */
                if (chars.data.status === "Dead") {
                  return (
                    <div
                      className={`${styles.badge} position-absolute badge bg-danger`}
                    >
                      {chars.data.status}
                    </div>
                  );
                } else if (chars.data.status === "Alive") {
                  return (
                    <div
                      className={`${styles.badge} position-absolute badge bg-success`}
                    >
                      {chars.data.status}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`${styles.badge} position-absolute badge bg-secondary`}
                    >
                      {chars.data.status}
                    </div>
                  );
                }
              })()}
            </Link>
          ))}
        </div>
      </div>
    );
  } else if (
    /**
     * if character cannot be found according to filters set
     * then a dummy card shows
     */
    filtered.length === 0 &&
    (status !== "" || species !== "" || gender !== "")
  ) {
    return (
      <div
        style={{ cursor: "pointer" }}
        /**
         * clicking on the dummy card clears all filters
         */
        onClick={clear}
        className="col-lg-4 col-md-6 col-12 d-flex flex-column justify-content-center"
      >
        <div className="card border-primary bg-warning align-middle">
          <img
            className={`${styles.img2} img-fluid`}
            src="https://cdn4.iconfinder.com/data/icons/political-elections/50/48-512.png"
            alt=""
          />
          <div className="card-body">
            <div className="card-title mb-4 text-center">
              <h5>No Character Found !!!</h5>
            </div>
            <div className="card-text text-secondary text-center">
              Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    /**
     * Default card listing sorted by character id's
     */
    return (
      <div className="container">
        <div className="row">
          {chars.map((chars) => (
            /**
             * Clicking on the cards takes us to Character Details page
             */
            <Link
              style={{ textDecoration: "none" }}
              to={`/character/${chars.data.id}`}
              key={chars.data.id}
              className="col-lg-4 col-md-6 col-12 mb-3 position-relative"
            >
              <div
                className={`${styles.card} card h-100 bg-light d-flex flex-column justify-content-center`}
              >
                <img
                  className={`${styles.img} img-fluid`}
                  src={chars.data.image}
                  alt=""
                />
                <div className="card-body">
                  <div className="card-title mb-4 text-dark">
                    <h5>{chars.data.name}</h5>
                  </div>
                  <div className="card-text text-secondary align-bottom">
                    Last Location: {chars.data.location.name}
                  </div>
                </div>
              </div>

              {(() => {
                /**
                 * According to character's status badge color changes
                 */
                if (chars.data.status === "Dead") {
                  return (
                    <div
                      className={`${styles.badge} position-absolute badge bg-danger`}
                    >
                      {chars.data.status}
                    </div>
                  );
                } else if (chars.data.status === "Alive") {
                  return (
                    <div
                      className={`${styles.badge} position-absolute badge bg-success`}
                    >
                      {chars.data.status}
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`${styles.badge} position-absolute badge bg-secondary`}
                    >
                      {chars.data.status}
                    </div>
                  );
                }
              })()}
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default Cards;
