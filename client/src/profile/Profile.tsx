import { deleteProperty, updateStatus } from '@/apis'
import { Button } from '@/components/ui/button'
import EditPropertyInfo from './EditPropertyInfo'
import type { Property, PropertyList } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { userId } = useParams()
    const [editFormPopup, setEditFormPopup] = useState<boolean>(false)
    const [selectedProperty, setSelectedProperty] = useState<Property>();

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
        staleTime: 5 * 60 * 1000,
    })

    const deleteMutation = useMutation({
        mutationFn: (propertyId: string) => deleteProperty(propertyId),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['userProperties'] }),
                queryClient.invalidateQueries({ queryKey: ['allProperties'] }),
            ]),
                toast("Deleted property successfully")
        }
    })

    const updateStatusMutation = useMutation({
        mutationFn: (property: Property) => updateStatus(property),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['userProperties'] }),
                queryClient.invalidateQueries({ queryKey: ['allProperties'] }),
            ])
        },
        onError(error, variables, onMutateResult, context) {
            toast(error.message)
        },
    })

    function updatePropertyStatus(propertyId: string) {
        setEditFormPopup(true)
        const property = userProperties?.find(prop => prop.id === propertyId)
        setSelectedProperty(property)
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

            {isPending && (
                <p>Your properties are loading...</p>
            )}

            {userProperties && userProperties.length === 0 && (
                <p>Haven't posted properties yet</p>
            )}

            {userProperties && (
                userProperties.map(property => (
                    <div
                        key={property.id}
                        className='px-4 mx-auto md:my-5 my-3'>
                        <div className='border md:w-[640px] flex flex-col md:flex-row  gap-3 md:gap-10 hover:bg-gray-50'>
                            <div className='flex gap-2 md:gap-5'>
                                <img
                                    className='w-20 h-25 md:h-30'
                                    src={property.propertyImg}
                                    alt="Property image" />
                                <p className='w-[200px]'>{property.description}</p>
                            </div>
                            <div className='flex flex-col md:flex-row md:items-center md:gap-3'>
                                <div className='flex gap-3'>
                                    <Button className='bg-red-500' onClick={() => deleteMutation.mutate(property.id)}>Delete</Button>
                                    <Button
                                        onClick={() => updatePropertyStatus(property.id)}>
                                        Edit</Button>
                                    {property.status ? (
                                        <Button
                                            onClick={() => updateStatusMutation.mutate(property)}
                                            className='bg-green-400'>{updateStatusMutation.isPending ? 'Loading...' : 'Unmark'}</Button>
                                    ) : (
                                        <Button
                                            onClick={() => updateStatusMutation.mutate(property)}
                                            variant={'secondary'}>{updateStatusMutation.isPending ? 'Loading...' : 'Mark as rented'}</Button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {editFormPopup && (
                            <EditPropertyInfo
                                setEditFormPopup={setEditFormPopup}
                                selected={selectedProperty!} />
                        )}
                    </div>
                ))
            )}
            <ToastContainer />
        </div>
    )
}

export default Profile
