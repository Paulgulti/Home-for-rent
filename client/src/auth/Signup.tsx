import React, { useState } from 'react'
import { authClient } from '../lib/auth-client'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'

const Signup = () => {
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate();

    async function registerUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(),
            await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: '/'
            }), {
            onSuccess: (ctx: any) => {
                //redirect to the dashboard or sign in page
                console.log('Registration successful');
                navigate("/")
            },
            onError: (ctx: any) => {
                // display the error message
                alert(ctx.error.message);
            },
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border flex flex-col w-[80%] md:w-[60%] lg:w-[40%]">
                <p className='text-center'>Hello, Welcome</p>
                <form onSubmit={registerUser} className="flex flex-col items-center gap-2">
                    <Input
                        className='max-w-[300px]'
                        name="name"
                        type="text"
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <Button type="submit">Signup</Button>
                    <div className='flex justify-end'>
                        <div className='flex items-center'>
                            <p className='text-xs'>Already have an account?</p>
                            <Link to='/login'>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
