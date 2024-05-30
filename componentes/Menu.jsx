"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaHouse } from "react-icons/fa6";

const Menu = () => {
  const { data: session } = useSession();
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" className="btn navbtn">
                <FaHouse color={'#006b40'} className="me-2" /> <span className='align-middle'>Inicio</span>
              </Nav.Link>
              {session?.user && (
                <>
                  <Nav.Link href="/roles" className="btn navbtn">
                    <FaHouse color={'#006b40'} className="me-2" /> <span className='align-middle'>Crear rol</span>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;