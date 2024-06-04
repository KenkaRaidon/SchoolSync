'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Navbar, Nav } from "react-bootstrap";
import { FaHouse } from "react-icons/fa6";

const Menu = () => {
  const { data: session } = useSession();
  console.log(session)
  return (
    <Nav className="flex-column">
      <Nav.Link href="/" >
        <FaHouse /> <span className='align-middle'>Inicio</span>
      </Nav.Link>
      {session?.user?.role == "Administrador" && (
        <>
          <Nav.Link href="/roles" >
            <FaHouse /> <span className='align-middle'>Crear rol</span>
          </Nav.Link>
          <Nav.Link href="/auth/register" >
            <FaHouse /> <span className='align-middle'>Crear usuario</span>
          </Nav.Link>
        </>
      )}
      {session?.user?.role == "Profesor" && (
        <>
          <Nav.Link href="/room/createJoin">
            <FaHouse /> <span className='align-middle'>Room</span>
          </Nav.Link>
          <Nav.Link href="/announcement" >
            <FaHouse /> <span className='align-middle'>Crear anuncios</span>
          </Nav.Link>
        </>
      )}
      {session?.user?.role == "Padre" && (
        <>
          <Nav.Link href="/room/createJoin">
            <FaHouse /> <span className='align-middle'>Unirse a room</span>
          </Nav.Link>
        </>
      )}
      {session?.user?.role == "Alumno" && (
        <>
        </>
      )}
    </Nav>
  );
}

export default Menu;