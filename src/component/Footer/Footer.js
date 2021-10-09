import React from "react";

const Footer = () => {
  return (
    <div className="footer p-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>SHAH BOOK</h3>
            <p>This is a demo site of a book shop</p>
          </div>
          <div className="col-md-4">
            <h3>Links</h3>
            <a href="/" target="_blank">
              LinkedIn
            </a>
            <br></br>
            <a href="/" target="_blank">
              Github
            </a>
            <br></br>
            <a href="/" target="_blank">
              Facebook
            </a>
          </div>
          <div className="col-md-4">
            <h3>Contact</h3>
            <p>
              Dhaka - 1206, Bangladesh
              <br></br>+880 1685367806
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
