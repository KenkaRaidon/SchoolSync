"use client";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const registerUser = async (event) => {
    event.preventDefault();

    await axios.post('/api/auth/register', data);
  }

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <label>Name:</label>
        <input type='text' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
        <label>Email: </label>
        <input type='text' value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password:</label>
        <input type='password' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />

        <button type='submit'>Register User</button>
      </form>
    </>
  )
}