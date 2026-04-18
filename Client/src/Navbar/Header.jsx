
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import PostModal from "../Modals/PostModal";
import SignupModal from "../Modals/SignupModal";
import LoginModal from "../Modals/LoginModal";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import axios from "axios";

// ✅ REDUX
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Components/Store/UserSlice";

const Header = () => {
  const [showPost, setShowPost] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [categories, setCategories] = useState([]);

  // ✅ GET USER
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* ===== 1st Navbar ===== */}
      <Navbar bg="light" className="justify-content-between">
        <Container>
          <Navbar.Brand>PakClassified</Navbar.Brand>

          <Row className="g-2">
            {/* 🔴 NOT LOGGED IN */}
            {!user && (
              <>
                <Col>
                  <Button variant="success" onClick={() => setShowLogin(true)}>
                    Login
                  </Button>
                </Col>
                <Col>
                  <Button variant="success" onClick={() => setShowSignup(true)}>
                    Signup
                  </Button>
                </Col>
              </>
            )}

            {/* 🟢 LOGGED IN */}
            {user && (
              <>
                <Col className="d-flex align-items-center">
                  {user.img && (
                    <img
                      src={`http://localhost:3000/uploads/${user.img}`}
                      alt="profile"
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%", marginRight: "10px" }}
                    />
                  )}
                  <span>{user.firstname}</span>
                </Col>

                <Col>
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(logout());
                      localStorage.removeItem("token");
                    }}
                  >
                    Logout
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </Navbar>

      {/* Modals */}
      <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />

      {/* ===== 2nd Navbar ===== */}
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <h4 className="text-success fw-bolder">PakClassified</h4>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-3">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>

              <NavDropdown title="Categories" id="categories-dropdown">
                {categories.length === 0 && (
                  <NavDropdown.Item>Loading...</NavDropdown.Item>
                )}

                {categories.map((cat) => (
                  <NavDropdown.Item
                    key={cat._id}
                    as={Link}
                    to={`/category/${cat._id}`}
                  >
                    {cat.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>

              <Link to="/contact" className="nav-link">Contact</Link>
            </Nav>

            {/* ✅ ALWAYS VISIBLE BUTTON */}
            <Button
              variant="success"
              onClick={() => {
                if (!user) {
                  alert("Please login first");
                } else {
                  setShowPost(true);
                }
              }}
            >
              Post Advertisement
            </Button>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <PostModal show={showPost} handleClose={() => setShowPost(false)} />
    </>
  );
};

export default Header;