'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Navbar, Nav } from "react-bootstrap";
import { FaHouse } from "react-icons/fa6";

const Menu = () => {
  const { data: session } = useSession();
  return (
    <Nav className="flex-column">
      <Nav.Link href="/" className="btn navbtn mb-2">
        <FaHouse color={'#006b40'} className="me-2" /> <span className='align-middle'>Inicio</span>
      </Nav.Link>
      {session?.user && (
        <>
          <Nav.Link href="/roles" className="btn navbtn mb-2">
            <FaHouse color={'#006b40'} className="me-2" /> <span className='align-middle'>Crear rol</span>
          </Nav.Link>
          <Nav.Link href="/auth/register" className="btn navbtn mb-2">
            <FaHouse color={'#006b40'} className="me-2" /> <span className='align-middle'>Crear usuario</span>
          </Nav.Link>
        </>
      )}
    </Nav>
  );
}

export default Menu;