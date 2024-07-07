import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { FaFacebook, FaGoogle, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Editing/Authentication.js";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const success = "OK";

  const handleClose = () => setShow(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post(`http://127.0.0.1:4000/login`, {
        email,
        password,
      });
      const token = post.data.accessToken;
      sessionStorage.setItem("accessToken", token);

      login();
      navigate.push("/chat");
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response && error.response.data) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Terjadi Kesalahan");
      }
      setShow(true);
    }
  };

  useEffect(() => {
    document.title = "Login";
    if (isAuthenticated) {
      navigate("/chat");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="vh-100 box-login" onSubmit={handleLogin}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="photos col-md-9 col-lg-6 col-xl-5">
            <Card.Img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form className="form-login text-white">
              {msg === null || msg === success ? (
                ""
              ) : (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Sorry</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <div className="text-danger d-flex align-items-center">
                      <i className="fa-solid fa-circle-exclamation"></i>
                      <div className="ps-3">{msg}</div>
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <MDBBtn tag="a" color="none" className="me-4" style={{ color: "white" }}>
                  <FaFacebook />
                </MDBBtn>

                <MDBBtn tag="a" color="none" className="me-4" style={{ color: "white" }}>
                  <FaGoogle />
                </MDBBtn>

                <MDBBtn tag="a" color="none" className="me-4" style={{ color: "white" }}>
                  <FaTwitter />
                </MDBBtn>

                <MDBBtn tag="a" color="none" style={{ color: "white" }}>
                  <FaLinkedinIn />
                </MDBBtn>
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <Form.Group className="mb-4">
                <Form.Label>Email address</Form.Label>
                <InputGroup className="main-content">
                  <InputGroup.Text className="bg-transparent main-form">
                    <img src="./icons/mail.svg" alt="email" />
                  </InputGroup.Text>
                  <Form.Control
                    id="input"
                    className="main-form bg-transparent text-white"
                    size="lg"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-1">
                <Form.Label>Password</Form.Label>
                <InputGroup className="main-content">
                  <InputGroup.Text className="bg-transparent main-form">
                    <img src="./icons/lock.svg" alt="password" />
                  </InputGroup.Text>
                  <Form.Control
                    id="input"
                    className="main-form bg-transparent text-white"
                    size="lg"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <Button className="w-25 btn-lg" variant="primary" type="submit">
                  Login
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a href="/regist" className="link-primary">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-secondary">
        <div className="text-black mb-3 mb-md-0">2024 | Ahmad Ja'far Ali</div>

        <div>
          <a href="#!" className="text-black me-5">
            <FaFacebook />
          </a>
          <a href="#!" className="text-black me-5">
            <FaTwitter />
          </a>
          <a href="#!" className="text-black me-5">
            <FaGoogle />
          </a>
          <a href="#!" className="text-black">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPages;
