import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    phone: "",
    birthdate: "",
    password: "",
    confPassword: "",
  });
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const success = "Registrasi berhasil";

  const handleClose = () => setShow(false);

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const Register = async (e) => {
    e.preventDefault();

    const isNumber = isFinite(formData.phone);

    if (isNumber === false) {
      setMsg("Harap diisi nomer");
      return setShow(true);
    }
    if (new Date().getFullYear() - parseInt(formData.birthdate.slice(0, 4)) < 15) {
      setMsg("Anda harus berusia minimal 17 tahun");
      return setShow(true);
    }

    try {
      await axios.post("http://127.0.0.1:4000/v1/api/regist", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        birthdate: formData.birthdate,
        password: formData.password,
        confPassword: formData.confPassword,
      });
      setMsg(success);
      navigate("/login");
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
    document.title = "Registrasi";
  });
  return (
    <div>
      <div className="regist-all">
        <div className="row">
          <div className="col-md-7">
            <Card.Img variant="top" className="photos mt-4" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
          </div>
          <div className="col-md-5">
            <div className="regist-page">
              <div onSubmit={Register}>
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
                      <h5 className="fw-bold text-uppercase ">Sign Up</h5>
                      <p className=" mb-3">please create a new account</p>
                      <Form.Group className="content-groub mb-1">
                        <Form.Label>First Name</Form.Label>
                        <InputGroup className="main-content">
                          <InputGroup.Text className="bg-transparent main-form">
                            <img src="./icons/user.svg" alt="firstname" />
                          </InputGroup.Text>
                          <Form.Control type="firstname" placeholder="First Name" className="main-form bg-transparent text-white" size="sm" id="input" required name="firstname" value={formData.firstname} onChange={changeHandler} />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="content-groub mb-1">
                        <Form.Label>Last Name</Form.Label>
                        <InputGroup className="main-content">
                          <InputGroup.Text className="bg-transparent main-form">
                            <img src="./icons/user.svg" alt="lastname" />
                          </InputGroup.Text>
                          <Form.Control type="text" placeholder="Last Name" size="sm" id="input" className="main-form bg-transparent text-white" required name="lastname" value={formData.lastname} onChange={changeHandler} />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="content-groub mb-1">
                        <Form.Label>Gender</Form.Label>
                        <InputGroup>
                          <div class="form-check mt-2">
                            <input class="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="laki-laki" checked={formData.gender === "laki-laki"} onChange={changeHandler} />
                            <label class="form-check-label" for="flexRadioDefault1">
                              Laki - Laki
                            </label>
                            <div class="form-check form-check-inline ms-3">
                              <input class="form-check-input" type="radio" name="gender" id="inlineRadio1" value="perempuan" checked={formData.gender === "perempuan"} onChange={changeHandler} />
                              <label class="form-check-label" for="inlineRadio1">
                                Perempuan
                              </label>
                            </div>
                          </div>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="content-groub mb-1">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup className="main-content">
                          <InputGroup.Text className="bg-transparent main-form">
                            <img src="./icons/mail.svg" alt="email" />
                          </InputGroup.Text>
                          <Form.Control id="input" className="main-form bg-transparent text-white" size="sm" type="email" placeholder="Enter email" required name="email" value={formData.email} onChange={changeHandler} />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="content-groub mb-1">
                        <Form.Label>Nomor Telepon</Form.Label>
                        <InputGroup className="main-content">
                          <InputGroup.Text className="bg-transparent main-form">
                            <img src="./icons/phone.svg" alt="phone" />
                          </InputGroup.Text>
                          <Form.Control id="input" className="main-form bg-transparent text-white" size="sm" type="number" placeholder="Nomor" required name="phone" value={formData.phone} onChange={changeHandler} />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="content-groub mb-1">
                        <Form.Label>Birthdate</Form.Label>
                        <InputGroup className="main-content">
                          <InputGroup.Text className="bg-transparent main-form">
                            <img src="./icons/birthdate.svg" alt="date" />
                          </InputGroup.Text>
                          <Form.Control id="input" className="main-form bg-transparent text-white" size="sm" type="date" placeholder="mm/dd/yyyy" required name="birthdate" value={formData.birthdate} onChange={changeHandler} />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="content-groub mb-1">
                        <Form.Label>Kata Sandi</Form.Label>
                        <InputGroup className="main-content">
                          <InputGroup.Text className="bg-transparent main-form">
                            <img src="./icons/lock.svg" alt="password" />
                          </InputGroup.Text>
                          <Form.Control id="input" className="main-form bg-transparent text-white" size="sm" type="password" placeholder="Password" name="password" required value={formData.password} onChange={changeHandler} />
                        </InputGroup>
                      </Form.Group>
                      <Form.Group className="content-groub mb-1">
                        <Form.Label>Konfirmasi Kata Sandi</Form.Label>
                        <InputGroup className="main-content">
                          <InputGroup.Text className="bg-transparent main-form">
                            <img src="./icons/lock.svg" alt="confirmPassword" />
                          </InputGroup.Text>
                          <Form.Control id="input" className="main-form bg-transparent text-white" size="sm" type="password" placeholder="Password" name="confPassword" required value={formData.confPassword} onChange={changeHandler} />
                        </InputGroup>
                      </Form.Group>
                      <Button className="w-100" variant="success" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

// <div style={{ backgroundColor: "#004445" }}>
//   <div onSubmit={Register}>
//     <Container fluid>
//       <Row className="d-flex justify-content-center align-items-center h-100" style={{ borderRadius: "5%" }}>
//         <Card className="box-login justify-content-top" style={{ width: "40%", borderRadius: "1rem" }}>
//           <Card.Body className="p-5 d-flex flex-column">
//             <Form>
//               <Form.Group className="mb-1" controlId="formBasicFirstName">
//                 <Form.Label>First Name</Form.Label>
//                 <Form.Control type="firstName" placeholder="First Name" />
//               </Form.Group>
//               <Form.Group className="mb-1" controlId="formBasicLastName">
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control  size="sm" type="lastName" placeholder="Last Name" />
//               </Form.Group>
//               <Form.Group className="mb-1" controlId="formBasicGender">
//                 <Form.Label>Gender</Form.Label>
//                 <Form.Control  size="sm" type="gender" placeholder="Gender" />
//               </Form.Group>
//               <Form.Group className="mb-1" controlId="formBasicEmail">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control  size="sm" type="email" placeholder="Enter email" />
//                 <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
//               </Form.Group>
//               <Form.Group className="mb-1" controlId="formBasicPhone">
//                 <Form.Label>Nomor Telepon</Form.Label>
//                 <Form.Control  size="sm" type="number" placeholder="Nomor" />
//               </Form.Group>
//               <Form.Group className="mb-1" controlId="formBasicbirthdate">
//                 <Form.Label>Gender</Form.Label>
//                 <Form.Control  size="sm" type="date" placeholder="birthdate" />
//               </Form.Group>
//               <Form.Group className="mb-1" controlId="formBasicPassword">
//                 <Form.Label>Kata Sandi</Form.Label>
//                 <Form.Control  size="sm" type="password" placeholder="Password" />
//               </Form.Group>
//               <Form.Group className="mb-1" controlId="formBasicConfirmPassword">
//                 <Form.Label>Konfirmasi Kata Sandi</Form.Label>
//                 <Form.Control  size="sm" type="password" placeholder="Confirm Password" />
//               </Form.Group>
//               {/* <Form.Group className="mb-1" controlId="formBasicCheckbox">
//             <Form.Check type="checkbox" label="Check me out" />
//           </Form.Group> */}
//               <Button variant="dark" type="submit">
//                 Submit
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Row>
//     </Container>
//   </div>
// </div>

// ====================================================================================================================//

// import axios from "axios";
// import Modal from "react-bootstrap/Modal";

// import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
// import Button from "react-bootstrap/Button";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     email: "",
//     phone: "",
//     birthdate: "",
//     password: "",
//     confPassword: "",
//   });
//   const [msg, setMsg] = useState(null);
//   const [show, setShow] = useState(false);
//   const success = "Registrasi berhasil";

//   const handleClose = () => setShow(false);

//   const changeHandler = (event) => {
//     const { name, value, type, checked } = event.target;

//     setFormData((prevFromData) => {
//       return {
//         ...prevFromData,
//         [name]: type === "checkbox" ? checked : value,
//       };
//     });
//   };

//   const Register = async (e) => {
//     e.prevenDefault();

//     const isNumber = isFinite(formData.phone);

//     if (isNumber === false) {
//       setMsg("Harap diisi nomer");
//       return setShow(true);
//     }
//     if (parseInt(formData.birtdate.slice(0, 4)) >= 2005) {
//       setMsg("anda harus berusia 17 tahun");
//       return setShow(true);
//     }

//     try {
//       await axios.post("http://127.0.0.1:4000/v1/api/regist", {
//         firstName: formData.firstName,
//         lastName: formData.lastname,
//         gender: formData.gender,
//         email: formData.email,
//         phone: formData.phone,
//         birtdate: formData.birthdate,
//         password: formData.password,
//         confPassword: formData.confPassword,
//       });
//       setMsg(success);
//     } catch (error) {
//       setMsg(error.response.data.msg);
//       setShow(true);
//     }
//   };
//   return (
//     <div>
//       <Navbar />
//       <div className="box-login" onSubmit={Register}>
//         <MDBContainer fluid>
//           <MDBRow className="d-flex justify-content-center align-items-center h-100">
//             <MDBCol col="12">
//               <MDBCard className="bg-dark text-white my-5 mx-auto" style={{ borderRadius: "1rem", maxWidth: "400px" }}>
//                 <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
//                   <h2 className="fw-bold text-uppercase">Sign Up</h2>
//                   <p className="text-white-50 mb-5">please create a new account</p>
//                   {msg === null || msg === success ? (
//                     ""
//                   ) : (
//                     <Modal show={show}>
//                       <Modal.Header>
//                         <Modal.Title>Sorry</Modal.Title>
//                       </Modal.Header>

//                       <Modal.Body>
//                         <div className="text-danger d-flex align-items-center">
//                           <i className="fa-solid fa-circle-exclamation"></i>
//                           <div className="ps-1">{msg}</div>
//                         </div>
//                       </Modal.Body>

//                       <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>
//                           Close
//                         </Button>
//                       </Modal.Footer>
//                     </Modal>
//                   )}
//                   <MDBInput className="box-regist" placeholder="First Name"  label="First Name" size="sm" id="form1" type="firstName" />
//                   <MDBInput className="box-regist" placeholder="Last Name"  label="Last Name" size="sm" id="form2" type="lastName" value={formData.firstName} onChange={changeHandler} />
//                   <MDBInput className="box-regist" placeholder="Jenis Kelamin"  label="Jenis Kelamin" size="sm" id="form3" type="gender" value={formData.gender} onChange={changeHandler} />
//                   <MDBInput className="box-regist" placeholder="Email"  label="Email" size="sm" id="form6" type="email" value={formData.email} onChange={changeHandler} />
//                   <MDBInput className="box-regist" placeholder="Nomor"  label="Nomor Telepon" size="sm" id="form5" type="number" value={formData.phone} onChange={changeHandler} />
//                   <MDBInput className="box-regist" placeholder="Tanggal Lahir"  label="Tanggal Lahir" size="sm" id="form4" type="date" value={formData.birthdate} onChange={changeHandler} />
//                   <MDBInput className="box-regist" placeholder="Kata sandi"  label="Password" size="sm" id="form7" type="password" value={formData.password} onChange={changeHandler} />
//                   <MDBInput className="box-regist" placeholder="Konfirmasi kata sandi"  label="Confirm password" size="sm" id="form8" type="password" value={formData.confPassword} onChange={changeHandler} />

//                   <Button variant="outline-light" size={40}>
//                     Registrasi
//                   </Button>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Register;

// // import Login from "../components/Login";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";

// // import React from "react";

// // function LoginPages() {
// //   return (
// //     <div>
// //       <Navbar />
// //       <Login />
// //       <Footer />
// //     </div>
// //   );
// // }

// // export default LoginPages;

// // import React from "react";
// // import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from "mdb-react-ui-kit";
// // import Navbar from "../components/Navbar";
// // import Footer from "../components/Footer";

// // const Register = () => {
// //   return (
// //     <div>
// //       <Navbar />
// //       <MDBContainer fluid className="d-flex align-items-center justify-content-center bg-image" style={{ backgroundImage: "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)" }}>
// //         <div className="mask gradient-custom-1"></div>
// //         <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
// //           <MDBCardBody className="px-5">
// //             <h2 className="text-uppercase text-center mb-5">Create an account</h2>
// //             <MDBInput className="box-regist"  label="First Name" size="sm" id="form1" type="firstName" />
// //             <MDBInput className="box-regist"  label="Last Name" size="sm" id="form2" type="lastName" />
// //             <MDBInput className="box-regist"  label="Jenis Kelamin" size="sm" id="form3" type="gender" />
// //             <MDBInput className="box-regist"  label="Tanggal Lahir" size="sm" id="form4" type="date" />
// //             <MDBInput className="box-regist"  label="Nomor Telepon" size="sm" id="form5" type="number" />
// //             <MDBInput className="box-regist"  label="Email" size="sm" id="form6" type="email" />
// //             <MDBInput className="box-regist"  label="Password" size="sm" id="form7" type="password" />
// //             <MDBInput className="box-regist"  label="Confirm password" size="sm" id="form8" type="password" />
// //             <div className="d-flex flex-row justify-content-center mb-5">
// //               <MDBCheckbox name="flexCheck" id="flexCheckDefault" label="I agree all statements in Terms of service" />
// //             </div>
// //             <MDBBtn className="mb-5 w-100 gradient-custom-4" size="lg">
// //               Register
// //             </MDBBtn>
// //           </MDBCardBody>
// //         </MDBCard>
// //       </MDBContainer>
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Register;
