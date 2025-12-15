import { Link, Outlet, useNavigate } from 'react-router';
import { authClient } from './lib/auth-client';
import { useState } from 'react';
import { Building2, LogOutIcon, Mail, Menu, User, X } from "lucide-react";
import { Button } from './components/ui/button';



const Header = () => {
    const [openUser, setOpenUser] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()


    const { data: session } = authClient.useSession()

    function signout() {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    navigate("/login"); // redirect to login page
                },
            },
        });
    }
    return (
        <div>
            <div className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border md:py-2'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center'>
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <Building2 className="h-8 w-8 text-primary" />
                            <span className="font-serif text-xl lg:text-2xl text-foreground">Akeray</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                to={'/properties'}>Properties
                            </Link>
                            <Link
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                to={'/dashboard'}>Dashboard
                            </Link>
                            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                                Services
                            </a>
                            {/* <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                                How It Works
                            </a> */}
                            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                                Contact
                            </a>
                        </div>
                        <div className='flex items-center'>
                            {session ? (
                                <div className='relative'>
                                    <div
                                        onClick={() => setOpenUser(!openUser)}>
                                        {session?.user.image ? (
                                            <img className='w-5 h-5 rounded-full' src={session.user.image} alt="user-avatar" />
                                        ) : (
                                            <img className='w-5 h-5 rounded-full' src="/user-avatar.png" alt="user-avatar" />
                                        )}
                                    </div>
                                    {openUser && (
                                        <div className="absolute top-full right-0 mt-2 p-2 bg-white border rounded shadow">
                                            <div className="flex items-center gap-2"><User size={16} /><p className='text-sm'>{session?.user.name}</p></div>
                                            <div className="flex items-center gap-2"><Mail size={16} /><p className='text-sm'>{session?.user.email}</p></div>
                                            <button className="flex items-center gap-2 mt-2 text-sm text-red-600 border px-4 py-1 rounded-md hover:cursor-pointer hover:bg-gray-50" onClick={signout}>Sign out <LogOutIcon size={12}/></button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    className='bg-primary text-primary-foreground hover:bg-primary/70 py-0.5 md:py-1 px-2 md:px-3 rounded-sm'
                                    to={'/login'}>
                                    Login
                                </Link>
                            )}
                            <button
                                className="md:hidden p-2"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="md:hidden py-4 border-t border-border animate-fade-in">
                            <div className="flex flex-col gap-4">
                                <Link
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    to={'/properties'}>Properties
                                </Link>
                                <Link
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    to={'/dashboard'}>Dashboard
                                </Link>
                                <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                                    Services
                                </a>
                                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                                    How It Works
                                </a>
                                <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                                    Contact
                                </a>
                                {!session && (
                                    <div className="md:hidden flex items-center gap-4">
                                        <Link to={'/signup'} className='hover:cursor-pointer text-muted-foreground hover:text-foreground transition-colors'>Signup</Link>
                                        <Button variant="default">Get Started</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Header
