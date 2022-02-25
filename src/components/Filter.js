import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Filter({ movies, callback }) {
  /*remove  */
  const duplicateCheck = [];
  movies &&
    movies
      .map((movie, index) => {
        if (duplicateCheck.includes(movie.category)) return null;
        duplicateCheck.push(movie.category);
        return movie;
      })
      .filter((e) => e);

  return (
    <Navbar variant="light" bg="white" expand="lg" style={{boxShadow:"0px 0px 10px black"}}>
      <Container fluid>
        <Navbar.Brand href="#home"><img alt="" src="https://blog.particeep.com/wp-content/uploads/2016/05/logo_particeep_FB.png" style={{width:"50px",heigth:"50px"}}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Category"
              menuVariant="dark"
            >
              {duplicateCheck.map((category) => (
                <NavDropdown.Item
                  onClick={(event) => {
                    callback(event.target.innerText);
                  }}
                  key={category}
                >
                  {category}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Filter;
