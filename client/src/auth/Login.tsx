import React, { useState } from 'react'
import { authClient } from '../lib/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from "react-router";


const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function signInUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
    })
  }

  async function signinWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin + '/'
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border flex flex-col w-[80%] md:w-[60%] lg:w-[40%]">
        <p className='text-center'>Welcome Back</p>
        <form onSubmit={signInUser} className="flex flex-col items-center gap-2">
          <Input
            className='max-w-[300px]'
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className='max-w-[300px]'
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" >Login</Button>
        </form>
        <Button onClick={signinWithGoogle} type="button" variant="link" className="">
          Sign in with google
        </Button>
        <div className='flex justify-end'>
          <div className='flex items-center'>
            <p className='text-xs'>You don't have an account?</p>
            <Link to='/signup'>Signup</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
