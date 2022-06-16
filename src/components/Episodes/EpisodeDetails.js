import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";

const EpisodeDetails = () => {
  /**
   * Taking the id info from parent component to fetch unique data
   */
  const params = useParams();
  const id = params?.id;

  /**
   * Setting variables to fetch Episode Details and Characters
   */
  const [info, setInfo] = useState([]);
  const [chars, setChars] = useState([]);

  /**
   * Setting variables for filterable character details
   */
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [filtered, setFiltered] = useState([]);

  let api = `https://rickandmortyapi.com/api/episode/${id}`;

  useEffect(() => {
    /**
     * Fetching specific episode details
     */
    const fetchEpisodeDetails = async () => {
      const response = await axios.get(api).catch((err) => {
        console.log("Err: ", err);
      });
      setInfo(response);

      /**
       * Fetching all characters from specific episode
       */
      const fetchChars = await Promise.all(
        response.data.characters.map((x) => {
          return axios.get(x);
        })
      );
      setChars(fetchChars);
    };
    fetchEpisodeDetails();
  }, [api]);

  /**
   * Setting filter variable according to data coming from child components
   */
  useEffect(() => {
    if (status && species && gender) {
      setFiltered(
        chars?.filter(
          (character) =>
            character?.data?.status?.toLowerCase() === status?.toLowerCase() &&
            character?.data?.species?.toLowerCase() ===
              species?.toLowerCase() &&
            character?.data?.gender?.toLowerCase() === gender?.toLowerCase()
        )
      );
    } else if (status && species && !gender) {
      setFiltered(
        chars?.filter(
          (character) =>
            character?.data?.status?.toLowerCase() === status?.toLowerCase() &&
            character?.data?.species?.toLowerCase() === species?.toLowerCase()
        )
      );
    } else if (status && !species && gender) {
      setFiltered(
        chars?.filter(
          (character) =>
            character?.data?.status?.toLowerCase() === status?.toLowerCase() &&
            character?.data?.gender?.toLowerCase() === gender?.toLowerCase()
        )
      );
    } else if (!status && species && gender) {
      setFiltered(
        chars?.filter(
          (character) =>
            character?.data?.species?.toLowerCase() ===
              species?.toLowerCase() &&
            character?.data?.gender?.toLowerCase() === gender?.toLowerCase()
        )
      );
    } else if (status) {
      setFiltered(
        chars?.filter(
          (character) =>
            character?.data?.status?.toLowerCase() === status?.toLowerCase()
        )
      );
    } else if (species) {
      setFiltered(
        chars?.filter(
          (character) =>
            character?.data?.species?.toLowerCase() === species?.toLowerCase()
        )
      );
    } else if (gender) {
      setFiltered(
        chars?.filter(
          (character) =>
            character?.data?.gender?.toLowerCase() === gender?.toLowerCase()
        )
      );
    }
  }, [chars, status, species, gender]);

  return (
    /**
     * Episode Details page contains base episode infos as a header
     * also filter section
     * and listed character cards who were seen in the episode
     */
    <div className="container">
      <div className="row">
        <div className="text-center mb-3">
          <div className="fs-4">
            <strong>{info?.data?.episode}</strong>
          </div>
          <div className="fs-5">
            <strong>Episode Name: </strong>
            <span className="text-primary">{info?.data?.name}</span>
          </div>
          <div className="text-secondary">
            Air Date: {info?.data?.air_date}{" "}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-12 mb-5">
          <Filter
            setStatus={setStatus}
            setSpecies={setSpecies}
            setGender={setGender}
          />
        </div>
        <div className="col-lg-9 col-12">
          <Cards
            setStatus={setStatus}
            setSpecies={setSpecies}
            setGender={setGender}
            status={status}
            species={species}
            gender={gender}
            chars={chars}
            filtered={filtered}
          />
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
