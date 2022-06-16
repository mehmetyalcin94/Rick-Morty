/**
 * importig bootstrap
 */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import "./App.css";

/**
 * importing hooks and plugins
 */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/**
 * importing components
 */
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/Search/Search";
import EpisodeDetails from "./components/Episodes/EpisodeDetails";
import EpisodeListing from "./components/Episodes/EpisodeListing";
import CardDetail from "./components/Cards/CardDetail";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/episode/:id" element={<EpisodeDetails />} />
        <Route path="/character/:id" element={<CardDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

const Home = () => {

  /**
   * Setting variables to fetch episodes
   */
  const [info, setInfo] = useState([]);
  const [count, setCount] = useState(1);
  const [newCount, setNewCount] = useState([1]);

  /**
   * variable to read search bar
   */
  const [search, setSearch] = useState("");

  /**
   * Setting apis
   */
  let api = "https://rickandmortyapi.com/api/episode";
  let apiEpisodes = `https://rickandmortyapi.com/api/episode/[${newCount}]`;

  /**
   * Takes the count number of all episodes
   */
  useEffect(() => {
    const fetchCount = async () => {
      const response = await axios.get(api).catch((err) => {
        console.log("Err: ", err);
      });
      setCount(response.data.info.count);
    };
    fetchCount();
  });

  /**
   * Makes an array of episode numbers starting from 1 to count number
   * The reason is api page requires [1,2,3...{last episode}] search in array type
   */
  useEffect(() => {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(i + 1);
    }
    setNewCount([...array]);
  }, [count]);

  /**
   * Finally fetching all episodes from api
   */
  useEffect(() => {
    const fetchEpisodes = async () => {
      const response = await axios.get(apiEpisodes).catch((err) => {
        console.log("Err: ", err);
      });
      setInfo(response);
    };
    fetchEpisodes();
  }, [apiEpisodes]);

  return (
    /**
     * Home page contains a search bar and episode cards listing
     */
    <div className="container">
      <div className="row">
        <Search setSearch={setSearch} />
      </div>
      <div className="row">
        <EpisodeListing info={info} search={search} />
      </div>
    </div>
  );
};
export default App;
