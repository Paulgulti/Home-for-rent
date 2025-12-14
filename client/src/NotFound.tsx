import { Link } from 'react-router'

const NotFound = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className=''>
                {/* <h1>404 - Page Not Found</h1> */}
                <img src="/404-error.svg" className='w-[250px] h-[250px] md:w-[400px] md:h-[400px]' alt="" />
                <div className='flex flex-col items-center'>
                    <p className='text-sm md:text-[16px]'>The page you're looking for does not exist.</p>
                    <Link
                        to="/"
                        className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-center rounded-md font-semibold py-1.5 px-2 text-[14px] mt-2">
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
