'use client'
import React from 'react';
import Image from 'next/image';
import { FaRegMoon, FaSun, FaUserLarge } from 'react-icons/fa6'
import Dropdown from 'react-bootstrap/Dropdown';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Menu from './Menu';

const Header = ({ className }) => {
  const { data: session } = useSession();

  return (
    <div className={`d-flex flex-column align-items-center p-3 ${className}`} style={{ width: '250px' }}>
      <a href="/" className="mb-3">
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={74} height={74}
          fixed="true"
          className="navbar-logo"
        />
      </a>

      <div className="mb-4">
        <label>SchoolSync</label>
      </div>

      <div className="flex-grow-1">
        <Menu />
      </div>

      <div className="mt-auto">
        {session ? (
          <Dropdown>
            <Dropdown.Toggle variant="link" className="mr-2 dropdown-toggle" id="dropdown-basic">
              <FaUserLarge color={'black'} size={'2rem'} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Dropdown.ItemText>Bienvenido {session.user?.name}</Dropdown.ItemText>
              </Dropdown.Item>
              <Dropdown.Item onClick={(e) => {
                e.preventDefault();
                signOut()
              }}>
                <Dropdown.ItemText>Cerrar Sesión</Dropdown.ItemText>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link className="btn green-btn" href="/auth/login">Sign In</Link>
        )}
      </div>
    </div>
  );
};

export default Header;