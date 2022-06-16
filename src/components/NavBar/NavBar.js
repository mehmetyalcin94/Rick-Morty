import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand fs-3 ubuntu">
          Rick and Morty <span className="text-primary">WiKi</span>
        </Link>
        <a
          className="nav-link active text-secondary fs-4"
          style={{ textDecoration: "none" }}
          href="https://rickandmortyapi.com"
          target="_blank"
        >
          Source
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
