import { Link, Outlet, useNavigate } from 'react-router';
import { authClient } from './lib/auth-client';
import { useState } from 'react';

const Header = () => {
    const [openUser, setOpenUser] = useState<boolean>(false);
    const navigate = useNavigate()
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
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
        <div className='container mx-auto'>
            <div className='border shadow-3xl flex justify-between items-center'>
                <Link to="/">K</Link>
                <div className='flex gap-2 md:gap-4'>
                    <Link className='text-sm' to="/properties">Properties</Link>
                    <Link className='text-sm' to="/dashboard">Dashboard</Link>
                    <Link className='text-sm' to="/owner">Owner</Link>
                </div>
                {session ? (
                    <div className='relative'>
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
                    <Link to="/signup">Signup</Link>
                )}
            </div>
            <Outlet />
        </div>
    )
}

export default Header
