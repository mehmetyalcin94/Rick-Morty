import React from "react";

import Status from "./category/Status";
import Species from "./category/Species";
import Gender from "./category/Gender";

const Filter = ({ setStatus, setSpecies, setGender }) => {
  /**
   * a func to clear filters
   */
  const clear = () => {
    setStatus("");
    setSpecies("");
    setGender("");
    window.location.reload(false);
  };

  return (
    <div>
      <div className="text-center fs-3 mb-2 fw-bold">Filters</div>
      <div
        style={{ cursor: "pointer" }}
        onClick={clear}
        className="text-primary text-decoration-underline text-center mb-3"
      >
        Clear Filters
      </div>
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <Status setStatus={setStatus} />
        </div>
        <div className="accordion-item">
          <Species setSpecies={setSpecies} />
        </div>
        <div className="accordion-item">
          <Gender setGender={setGender} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
