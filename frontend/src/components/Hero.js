import React from "react";
import { useAuth } from "../Editing/Authentication.js";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth(false);

  const handleClick = (e) => {
    if (isAuthenticated) {
      return navigate("/login");
    } else {
      return navigate("/Chat");
    }
  };
  // const handleClick = (e) => {
  //   e.preventDefault(); // Prevent the default anchor behavior
  //   if (isLoggedIn) {
  //     navigate("/chat");
  //   } else {
  //     navigate("/login");
  //   }
  return (
    <div>
      <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
        <div className="hero-container" data-aos="fade-in">
          <Row>
            <div className="row align-items-start">
              <div className="col-lg bot">
                <h1 className="fw-bold">SELAMAT DATANG DI</h1>
                <div className="jumbotron">
                  <h1 className="fw-bold" style={{ fontSize: "45px" }}>
                    {" "}
                    APLIKASI CHATBOT E-KTP
                  </h1>
                  <br />
                  <p>
                    Chatbot E-KTP merupakan inovasi canggih berupa sistem berbasis kecerdasan buatan yang telah diciptakan untuk menyederhanakan proses pendaftaran dengan memberikan pengalaman yang lebih intuitif dan efisien bagi pengguna
                    agar memudahkan proses pendaftaran melalui interaksi dengan pengguna.
                  </p>
                  <br />
                  <a className="button btn btn-lg" href="/chat" role="button" onClick={handleClick}>
                    MULAI
                  </a>
                </div>
              </div>
              <div className="col-lg witch">
                <Card.Img variant="top" className="rounded-3" src="./images/chat.png" style={{ width: "88%" }} />
              </div>
            </div>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Hero;
