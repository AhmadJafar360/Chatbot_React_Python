import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";

function ColorSchemesExample() {
  return (
    <>
      <Nav className="nav navbar navbar-expand-lg">
        <div className="container-fluid text">
          <div className="navbar-brand text-white">
            <p>Chatbot E-KTP</p>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Menu
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body" id="navbarNav">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/regist" style={{ paddingRight: "25px" }}>
                    <h6 style={{ color: "white", font: "14px" }}>Register</h6>
                  </a>
                </li>
                <li className="nav-item">
                  <Button type="button" className="btn btn-primary" href="/login">
                    Log in
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
}

export default ColorSchemesExample;

/* <Navbar className="nav" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="ms-auto" style={{ padding: "0% 0% 0% 5%" }}>
            <Nav.Link href="/regist" style={{ paddingRight: "50%" }}>
              Register
            </Nav.Link>
            <Button variant="info" href="/login" style={{ width: "100%", marginRight: "50%" }}>
              Login
            </Button>
          </Nav>
        </Container>
      </Navbar> */
