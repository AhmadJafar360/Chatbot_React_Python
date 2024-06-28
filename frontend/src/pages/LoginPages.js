import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaFacebook, FaGoogle, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MDBBtn } from "mdb-react-ui-kit";

import server from "../server";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const success = "OK";

  const handleClose = () => setShow(false);

  const Login = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post(`${server}/v1/api/login`, {
        email: email,
        password: password,
      });
      const token = post.data.accessToken;
      sessionStorage.setItem("accessToken", token);

      navigate("/chat");
    } catch (error) {
      console.log(error);
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
  });
  return (
    <section className="vh-100 box-login" onSubmit={Login}>
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
                <Modal show={show}>
                  <Modal.Header>
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
                    wrapperClassNamclassName="mt-5 w-100"
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
                <Form.Label>Kata Sandi</Form.Label>
                <InputGroup className="main-content">
                  <InputGroup.Text className="bg-transparent main-form">
                    <img src="./icons/lock.svg" alt="email" />
                  </InputGroup.Text>
                  <Form.Control
                    id="input"
                    className="main-form bg-transparent text-white"
                    wrapperClassNamclassName="mt-5 w-100"
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
                  <label className="form-check-label" for="form2Example3">
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

/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { FaFacebook, FaGoogle, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MDBBtn } from "mdb-react-ui-kit";
import server from "../server";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const success = "OK";

  const handleClose = () => setShow(false);

  const Login = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post(`${server}/v1/api/login`, {
        email: email,
        password: password,
      });
      const token = post.data.accessToken;
      sessionStorage.setItem("accessToken", token);

      navigate("/chat");
    } catch (error) {
      console.log(error);
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
  });

<div className="box-login" onSubmit={LoginPages}>
<div className="row">
  <div className="col-md-7">
    <Card.Img variant="top" className="image-content mb-1 rounded-5" src="./images/chat.jpg" />
  </div>
  <div className="col-md-5">
    <div className="class-form">
      <Container>
        <Row className="content-row d-flex justify-content-center align-items-center" style={{ borderRadius: "5%" }}>
          <Form className="content-form text-white">
            {msg === null || msg === success ? (
              ""
            ) : (
              <Modal show={show}>
                <Modal.Header>
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
            <h4 className="fw-bold text-uppercase">Login</h4>
            <Form.Group className="mb-1">
              <Form.Label>Email address</Form.Label>
              <InputGroup className="main-content">
                <InputGroup.Text className="bg-transparent main-form">
                  <img src="./icons/mail.svg" alt="email" />
                </InputGroup.Text>
                <Form.Control
                  id="input"
                  className="main-form bg-transparent text-white"
                  wrapperClassNamclassName="mt-5 w-100"
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
              <Form.Label>Kata Sandi</Form.Label>
              <InputGroup className="main-content">
                <InputGroup.Text className="bg-transparent main-form">
                  <img src="./icons/lock.svg" alt="email" />
                </InputGroup.Text>
                <Form.Control
                  id="input"
                  className="main-form bg-transparent text-white"
                  wrapperClassNamclassName="mt-5 w-100"
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
            <Form.Group className="mb-1" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <p className="text-center text-white">
            Belum punya akun? <a href="/regist">Register</a>
          </p>
        </Row>
      </Container>
    </div>
  </div>
</div>
</div> */

/* <div className="box-login" onSubmit={LoginPages}>
        <MDBContainer fluid style={{ backgroundImage: "../../public/images/background.jpg" }}>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: "1rem", maxWidth: "400px" }}>
                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
                  {msg === null ? (
                    ""
                  ) : (
                    <Modal show={show}>
                      <Modal.Header>
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
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    type="email"
                    placeholder="example@gmail.com"
                    label="Email address"
                    id="formControlLg"
                    size="lg"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    labelClass="text-white"
                    type="password"
                    placeholder="password"
                    label="Password"
                    id="formControlLg"
                    size="lg"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <Button variant="outline-light" size={40}>
                    Login
                  </Button>

                  <div className="d-flex flex-row mt-3 mb-5">
                    <MDBBtn tag="a" color="none" className="m-3" style={{ color: "white" }}>
                      <FaFacebook size={30} />
                    </MDBBtn>

                    <MDBBtn tag="a" color="none" className="m-3" style={{ color: "white" }}>
                      <FaGoogle size={30} />
                    </MDBBtn>

                    <MDBBtn tag="a" color="none" className="m-3" style={{ color: "white" }}>
                      <FaGithub size={30} />
                    </MDBBtn>

                    <MDBBtn tag="a" color="none" className="m-3" style={{ color: "white" }}>
                      <FaTwitter size={30} />
                    </MDBBtn>
                  </div>

                  <div>
                    <p className="mb-0">
                      <a href="/regist" className="text-white-50 fw-bold">
                        Don't have an account? Sign Up
                      </a>
                    </p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div> */
