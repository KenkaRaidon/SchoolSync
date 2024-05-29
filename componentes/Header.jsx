"use client"
import React from 'react';
import Image from 'next/image';
import { FaRegMoon, FaSun, FaUserLarge } from 'react-icons/fa6'
import Dropdown from 'react-bootstrap/Dropdown';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Menu from './Menu';

const Header = () => {
    const { data: session } = useSession();

    return (
        <>
            <div className="ribbon-header">
                <div >
                    <a href="/" >
                        <Image
                            src="/assets/images/logo.png"
                            alt="Logo"
                            width={74} height={74}
                            fixed="true"
                            className="navbar-logo me-3"
                        />
                    </a>
                </div>

                <div style={{ width: "100%" }}>
                    <label>SchoolSync</label>
                </div>

                <div className="rightbar" >
                    { session ? (
                        <Dropdown >
                            <Dropdown.Toggle variant="link" className="mr-2 dropdown-toggle" id="dropdown-basic" >
                                <FaUserLarge color={'white'} size={'2rem'} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item >
                                    <Dropdown.ItemText>Bienvenido {session.user?.name}</Dropdown.ItemText>
                                </Dropdown.Item >
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
            <Menu></Menu>
        </>
    );
};

export default Header;