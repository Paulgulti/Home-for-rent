import { deleteProperty } from '@/apis'
import { Button } from '@/components/ui/button'
import type { PropertyList } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'

const Profile = () => {

    const navigate = useNavigate()

    const { userId } = useParams()

    const { isPending, isError, error, data: userProperties } = useQuery({
        queryKey: ['userProperties'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:8080/api/properties/user/${userId}`, { credentials: 'include' })
            if (res.status === 401) {
                navigate('/signup')
                return
            }
            const data = await res.json() as PropertyList
            return data
        },
        staleTime: 1 * 60 * 1000,
    })
    

    async function hanleDeleteProperty(propertyId: string) {
        await deleteProperty(propertyId)
    }


    return (
        <div>
            Profile page
            {/* {Own property} */}


            <h2>Your properties</h2>

            {isError && (
                <div>
                    <p>Encountered a problem fetching your properties. <span>Please try again later</span> </p>
                </div>
            )}

            {userProperties && userProperties.length === 0 && (
                <p>Haven't posted properties yet</p>
            )}

            {userProperties && (
                userProperties.map(property => (
                    <div className='px-4 mx-auto md:my-5 my-3'>
                        <div className='border md:w-[500px] flex items-center gap-6 hover:bg-gray-50'>
                            <img
                                className='w-20 h-25 md:h-30'
                                src={property.propertyImg}
                                alt="Property image" />
                            <div className='flex flex-col md:flex-row md:items-center md:gap-3'>
                                <p className='w-[200px] line-clamp-2'>{property.description}</p>
                                <div className='flex gap-3'>
                                    <Button>Edit</Button>
                                    <Button onClick={() => hanleDeleteProperty(property.id)}>Delete</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}

        </div>
    )
}

export default Profile
