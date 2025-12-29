import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Building2, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openUser, setOpenUser] = useState<boolean>(false);

    
    const navigate = useNavigate()
    const {
        data: session,
    } = authClient.useSession()

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
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2">
                        <Building2 className="h-8 w-8 text-primary" />
                        <span className="font-serif text-xl lg:text-2xl text-foreground">PropManage</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                            Services
                        </a>
                        <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                            How It Works
                        </a>
                        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                            About
                        </a>
                        <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </a>
                    </div>
                    {session ? (
                        <div className='relative hidden md:block'>
                            <div
                                onClick={() => setOpenUser(!openUser)}>
                                {session?.user.image ? (
                                    <img className='w-5 h-5 rounded-full' src={session.user.image} alt="user-avatar" />
                                ) : (
                                    <img className='w-5 h-5 rounded-full' src="/user-avatar.png" alt="aaa" />
                                )}
                            </div>
                            {openUser && (
                                <div className="absolute top-full right-0 mt-2 p-2 bg-white border rounded shadow">
                                    <p className="text-sm">{session?.user.name}</p>
                                    <Link to={`/${session.user.id}`} >Profile</Link>
                                    <p className="text-xs text-gray-600">{session?.user.email}</p>
                                    <button className="mt-2 text-sm text-red-600" onClick={signout}>Sign out</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-4">
                            <Button variant="ghost" asChild><Link to={'/login'}>Log In</Link></Button>
                            <Button variant="default">Get Started</Button>
                        </div>
                    )}
                    {/* Desktop CTA */}
                    {/* <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost">Log In</Button>
                        <Button variant="default">Get Started</Button>
                    </div> */}

                    <div className="flex items-center">
                        {session && (
                            <div className='relative md:hidden'>
                                <div
                                    onClick={() => setOpenUser(!openUser)}>
                                    {session?.user.image ? (
                                        <img className='w-5 h-5 rounded-full' src={session.user.image} alt="user-avatar" />
                                    ) : (
                                        <img className='w-5 h-5 rounded-full' src="/user-avatar.png" alt="aaa" />
                                    )}
                                </div>
                                {openUser && (
                                    <div className="absolute top-full right-0 mt-2 p-2 bg-white border rounded shadow">
                                        <p className="text-sm">{session?.user.name}</p>
                                        <Link to={`/${session.user.id}`} >Profile</Link>
                                        <p className="text-xs text-gray-600">{session?.user.email}</p>
                                        <button className="mt-2 text-sm text-red-600" onClick={signout}>Sign out</button>
                                    </div>
                                )}
                            </div>
                        )}
                        <button
                            className="md:hidden p-2"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>

                    </div>

                    {/* Mobile Menu Button */}

                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-border animate-fade-in">
                        <div className="flex flex-col gap-4">
                            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                                Services
                            </a>
                            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                                How It Works
                            </a>
                            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                                About
                            </a>
                            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors py-2">
                                Contact
                            </a>
                            {/* <div className="flex flex-col gap-2 pt-4 border-t border-border">
                                <Button variant="ghost" className="w-full">Log In</Button>
                                <Button variant="default" className="w-full">Get Started</Button>
                            </div> */}
                            {!session && (
                                <div className="md:hidden flex items-center gap-4">
                                    <Button variant="ghost" asChild><Link to={'/login'}>Log In</Link></Button>
                                    <Button variant="default">Get Started</Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
            <Outlet/>
        </div>
    );
};

export default Navbar;
