import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useLogout from "../hook/useLogout";

const Navmenu = () => {
  const { user } = useAuth();
  const { logout } = useLogout();
  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Post Ninja
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user && (
                <Nav.Item className="my-2 mx-3">
                  <span>welcome, {user.displayName || user.email}</span>
                </Nav.Item>
              )}
              {user && (
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
              )}

              {/* ==========logout button======== */}
              {user && (
                <Nav.Link as={NavLink} to="/create-post">
                  Creat post
                </Nav.Link>
              )}

              {/* =========create post route======== */}
              {user && (
                <Nav.Item>
                  <button onClick={logout} className="btn btn-outline-danger">
                    Logout
                  </button>
                </Nav.Item>
              )}

              {/* ==========authentication routes======== */}
              {!user && (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
              {!user && (
                <Nav.Link as={NavLink} to="/signup">
                  Signup
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navmenu;
