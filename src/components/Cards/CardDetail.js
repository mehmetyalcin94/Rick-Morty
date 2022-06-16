import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CardDetail = () => {
  /**
   * Taking the id info from parent component to fetch unique data
   */
  const params = useParams();
  const id = params?.id;

  /**
   * Setting variable to fetch Character Details
   */
  const [char, setChar] = useState([]);
  const [firstSeen, setFirstSeen] = useState([]);

  /**
   * Fetching Character Details
   */
  useEffect(() => {
    const fetchCharDetails = async () => {
      const response = await axios
        .get(`https://rickandmortyapi.com/api/character/${id}`)
        .catch((err) => {
          console.log("Err: ", err);
        });
      setChar(response.data);
      /**
       * Fetching episodes the character has appeared in
       * to read the character's first seen episode
       */

      const fetchEpisode = await Promise.all(
        response.data.episode.map((x) => {
          return axios.get(x);
        })
      );
      setFirstSeen(fetchEpisode);
    };
    fetchCharDetails();
  }, [id]);

  /**
   * creating episodes array to list the episodes the character has appeared in
   */
  const episodes = [];
  for (let i = 0; i < char?.episode?.length; i++) {
    episodes.push(
      char?.episode[i]
        .split("https://rickandmortyapi.com/api/episode/")
        .join("")
    );
  }

  /**
   * setting the pronoun for the character
   */
  let pronoun = "";
  if (char.gender === "Male") {
    pronoun = "he";
  } else if (char.gender === "Female") {
    pronoun = "she";
  } else {
    pronoun = "it";
  }

  return (
    <div className="bg-light">
      <div className="container mt-5 mb-2">
        <div className="row">
          <div className="col-6">
            <div className="text-center fw-bold fs-2 mb-2 mt-5">
              {char.name}
            </div>
            <img
              src={char.image}
              alt=""
              className="img-fluid mb-5 img-thumbnail mx-auto d-block"
            />
          </div>
          <div className="col-6 table-responsive">
            <div className="table">
              <div className="row mx-auto">
                {(() => {
                  /**
                   * According to character's status badge color changes
                   */
                  if (char.status === "Dead") {
                    return (
                      <div className="badge bg-danger fs-2 mb-3 mt-5">
                        {char.status}
                      </div>
                    );
                  } else if (char.status === "Alive") {
                    return (
                      <div className=" badge bg-success fs-2 mb-3 mt-5">
                        {char.status}
                      </div>
                    );
                  } else {
                    return (
                      <div className="badge bg-secondary fs-2 mb-3 mt-5">
                        {char.status}
                      </div>
                    );
                  }
                })()}
              </div>
              <div className="container">
                <div className="row fs-5 mx-auto">
                  <div className="">
                    <strong>Gender: </strong>
                    {char.gender}
                  </div>
                </div>
                <div className="row fs-5 mx-auto">
                  <div className="">
                    <strong>Species: </strong>
                    {char.species}
                  </div>
                </div>
                <div className="row fs-5 mx-auto">
                  <div className="">
                    <strong>Origin: </strong>
                    {char?.origin?.name}
                  </div>
                </div>
                <div className="row fs-5 mx-auto">
                  <div className="">
                    <strong>Location: </strong>
                    {char?.location?.name}
                  </div>
                </div>
                <div className="row fs-5 mx-auto">
                  <div className="">
                    <strong>Total No. of Episodes: </strong>
                    {episodes.length}
                  </div>
                </div>
                <div className="row fs-5 mx-auto">
                  <div className="">
                    <strong>First seen in: </strong>
                    <Link
                      /**
                       * Clicking on the name takes you to the episode details page
                       */
                      style={{ textDecoration: "none" }}
                      to={`/episode/${firstSeen[0]?.data.id}`}
                      className="text-primary"
                    >
                      {firstSeen[0]?.data.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="mb-2 text-center fw-bold">
          Episodes {pronoun} has appeared in
        </div>
        <div className="row">
          {episodes.map((e) => (
            <Link
              /**
               * Clicking on the numbers takes you to episode details page
               */
              to={`/episode/${e}`}
              key={e}
              style={{ textDecoration: "none" }}
              className="btn btn-outline-primary m-1 col d-flex justify-content-center"
            >
              {e}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
