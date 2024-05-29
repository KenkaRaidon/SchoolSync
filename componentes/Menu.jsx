"use client"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Menu = () => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">NextAuth</h1>

      <ul className="flex gap-x-2">
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={(e) => {
                e.preventDefault();
                signOut()
              }} >Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Menu;