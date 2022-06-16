import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light mt-auto">
      <div className="row m-auto">
        <div className="col-6 text-end my-3">&copy; Made for</div>
        <div className="col-6">
          <a href="https://www.virtualitechnologies.com" target="_blank">
            <img
              className="img-fluid"
              src="https://virtualitechnologies.com/templates/template-default/view/assets/img/virtualilogo.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
