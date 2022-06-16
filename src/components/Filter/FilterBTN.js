import React from "react";
import styles from "./FilterBTN.module.scss";

const FilterBTN = ({ input, task, index, name }) => {
  return (
    <div>
      <div className="form-check">
        <input
          className={`${styles.x} form-check-input`}
          type="radio"
          name={name}
          id={`${name}-${index}`}
        />
        <label
          /**
           * sets the "status", "species" and "gender" to filter
           */
          onClick={(x) => {
            task(input);
          }}
          className="btn btn-outline-primary"
          htmlFor={`${name}-${index}`}
        >
          {input}
        </label>
      </div>
    </div>
  );
};

export default FilterBTN;
