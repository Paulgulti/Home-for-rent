import { deleteProperty, updateStatus } from '@/apis'
import { Button } from '@/components/ui/button'
import EditPropertyInfo from './EditPropertyInfo'
import type { Property, PropertyList } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import Owner from '@/owner/Owner'
import TestOwner from '@/dashboard/test-owner'
import { authClient } from '@/lib/auth-client'
import SavedProperties from '@/dashboard/SavedProperties'

const Profile = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { userId } = useParams()
    const [editFormPopup, setEditFormPopup] = useState<boolean>(false)
    const [postingModalPop, setPostingModalPop] = useState<boolean>(false)
    const [selectedProperty, setSelectedProperty] = useState<Property>();

    const { data: session, error: sessionError } = authClient.useSession()

    const { isPending, isError, error, data: userProperties } = useQuery({
        queryKey: ['userProperties'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:8080/api/properties/user`, { credentials: 'include' })
            if (res.status === 401) {
                navigate('/login')
                return
            }
            const data = await res.json() as PropertyList
            return data
        },
        staleTime: 5 * 60 * 1000,
    })

    function openPropertyForm() {
        if (!session?.user || sessionError) {
            navigate('/signup')
        } else setPostingModalPop(true)
    }

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
        <div className='py-10 md:py-12 '>
            {userProperties && userProperties.length === 0 && (
                <div className="text-sm sticky top-0 left-0 right-0 bg-amber-600 py-1 text-center text-white">
                    <p className='text-center w-[230px] md:w-auto mx-auto animate-pulse leading-4'>Your properties will appear here, once you start posting</p>
                </div>
            )}
            <div className='flex items-center'>
                <p>You want to post a house?</p>
                <Button className="" variant='link' onClick={openPropertyForm}>Click here</Button>
            </div>
            {postingModalPop && (
                <TestOwner
                    setPostingModalPop={setPostingModalPop} />
            )}
            {isPending ? (
                <div className="flex justify-center items-center h-screen w-full">
                    <svg
                        className="w-10 h-10 animate-spin "
                        viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <g fill="#000000" fillRule="evenodd" clipRule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g>
                    </svg>
                </div>
            ) : (
                <div>

                    {isError && (
                        <div className="flex h-screen justify-center items-center">
                            <div className="flex flex-col items-center">

                                <img
                                    className='w-20 h-20'
                                    src="/oops.svg" alt="oops image" />
                                <p className='text-sm md:text-[16px] max-w-[350px] text-center'>Encountered a problem fetching your properties. <span>Please try again later</span> </p>
                            </div>
                        </div>
                    )}
                    <div>
                        {userProperties && userProperties.length > 0 &&(
                            <div>
                                <h2 className="font-semibold">Your properties</h2>
                                {
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
                                                    <p className='w-[200px] text-sm md:text-[16px] text-gray-700'>{property.description}</p>
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
                                }
                            </div>
                        )}

                    </div>
                </div>
            )}
            <SavedProperties />
            <ToastContainer />
        </div>
    )
}

export default Profile
