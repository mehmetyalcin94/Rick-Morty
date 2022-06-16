import React from "react";
import { NavLink } from "react-router-dom";


const EpisodeListing = ({ info, search }) => {
  return (
    <div className="container">
      <div className="row">
        {info?.data
        /**
         * Search bar filtering for episode names or episode number or by date
         */
          ?.filter((info) => {
            if (search === "") {
              return info;
            } else if (info.name.toLowerCase().includes(search.toLowerCase())) {
              return info;
            } else if (info.episode.toLowerCase().includes(search.toLowerCase())) {
              return info;
            } else if (info.air_date.toLowerCase().includes(search.toLowerCase())) {
              return info;
            }
          })
          /**
           * Mapping info api data and displaying all episode cards according to filters
           */
          .map((info) => (
            <div key={info.id} className="col-lg-4 col-md-6 col-12 mb-3">
              <div className="card mb-3 h-100 text-center bg-light d-flex flex-column">
                <div className="card-body">
                  <h5 className="card-title">
                    <div>{info.episode === "" ? "Unknown" : info.episode}</div>
                  </h5>
                  <div className="card-text mb-2">
                    <div className="fs-5 text-primary">
                      {info.name === "" ? "Unknown" : info.name}
                    </div>
                    <div className="text-secondary">
                      Air Date:{" "}
                      {info.air_date === "" ? "Unknown" : info.air_date}
                    </div>
                  </div>
                  {/**
                   * Clicking on the cards takes us to Episode Details page
                   */}
                  <NavLink to={`/episode/${info.id}`}>
                    <button className="btn btn-primary">Episode Details</button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EpisodeListing;

