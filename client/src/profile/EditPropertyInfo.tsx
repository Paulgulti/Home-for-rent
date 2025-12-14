import { updatePropertyInfo } from '@/apis'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import type { Property } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Building2, X } from 'lucide-react'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

type EditPropertyInfoProps = {
    setEditFormPopup: React.Dispatch<React.SetStateAction<boolean>>,
    selected: Property
}

const EditPropertyInfo = ({ setEditFormPopup, selected }: EditPropertyInfoProps) => {
    const queryClient = useQueryClient()

    const [desc, setDesc] = useState<string>(selected?.description!)
    const [location, setLocation] = useState<string>(selected.location!)
    const [phoneNum, setPhoneNum] = useState<string>(selected?.phoneNumber!)
    const [price, setPrice] = useState<number | ''>(selected?.price!)
    const [priceNegotiability, setPriceNegotiability] = useState<string>(selected?.priceNegotiability!)

    function handlePropertyInfoUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            if (!desc || desc.trim() == '') {
                throw new Error("Please enter appropriate description of the house!")
            }
            if (!location || location.trim() == "") {
                throw new Error("Please enter location!")
            }
            if (!phoneNum || phoneNum.length < 10 || phoneNum.length > 10) {
                throw new Error("Please enter a valid 10 digit phone number!")
            }
            if (!price || price <= 0) {
                throw new Error("Please enter pricing!")
            }

            const updateProperty = updatePropertyInfo({
                id: selected.id,
                description: desc,
                location,
                phoneNumber: phoneNum,
                price,
                priceNegotiability
            })
            return updateProperty
        } catch (error) {
            // setError(error instanceof Error ? error.message : String(error))
            throw error
        }
    }

    const propertyUpdateMutation = useMutation({
        mutationFn: handlePropertyInfoUpdate,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['userProperties'] }),
                queryClient.invalidateQueries({ queryKey: ['allProperties'] }),
            ]),
                setEditFormPopup(false)
            toast("You have successfully updated your property information")
        }
    })


    return (
        <div
            className='py-20 fixed bg-black/50 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0' >
            <div className='bg-white p-4 relative w-[80%] md:w-[35%] max-h-[400px] md:max-h-full overflow-y-auto my-6 md:my-0 rounded-md md:rounded-xl'>
                <button
                    className='cursor-pointer absolute top-2 right-2'
                    onClick={() => {
                        // setError(null)
                        setEditFormPopup(false)
                    }}
                >
                    <X className="h-6 w-6" />
                </button>
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Building2 className="h-8 w-8 text-primary" />
                    <span className="font-serif text-xl lg:text-2xl text-foreground">PropManage</span>
                </div>
                <form
                    onSubmit={propertyUpdateMutation.mutate}
                    className='flex flex-col gap-3'>
                    {/* <Input value={property.description}/> */}
                    <div className='flex flex-col'>
                        <label htmlFor="">Property Description</label>
                        <Textarea
                            name="property-description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Location</label>
                        <Input
                            name=""
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Phone Number</label>
                        <Input
                            name=""
                            value={phoneNum ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value
                                if (/^\d*$/.test(value)) {
                                    setPhoneNum(value);
                                }
                            }}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Price</label>
                        <Input
                            name=""
                            value={price}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === "") {
                                    setPrice("")
                                } else {
                                    setPrice(parseInt(val))
                                }
                            }}
                        />
                    </div>
                    <fieldset>
                        <legend>Are u willing to negotiate price?</legend>
                        <div className='flex gap-10'>
                            <div className='flex items-center gap-1.5'>
                                <input
                                    id='negotiation-yes'
                                    type="radio"
                                    name="price-negotiability"
                                    checked={priceNegotiability === 'Yes'}
                                    value="Yes"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriceNegotiability(e.target.value)}
                                />
                                <label htmlFor="negotiation-yes">Yes</label>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <input
                                    id='negotiation-no'
                                    type="radio"
                                    name="price-negotiability"
                                    checked={priceNegotiability === 'No'}
                                    value="No"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriceNegotiability(e.target.value)}
                                />
                                <label htmlFor="negotiation-no">No</label>
                            </div>
                        </div>
                    </fieldset>
                    {propertyUpdateMutation.isError && (
                        <p className="text-red-500 text-xs">{propertyUpdateMutation.error.message}</p>
                    )}
                    {propertyUpdateMutation.isPending ? (
                        <Button size="sm" disabled>
                            <Spinner />
                            Submit
                        </Button>
                    ) : (
                        <Button type='submit'>Submit</Button>
                    )}
                </form>
            </div>
            <ToastContainer />
        </div >
    )
}

export default EditPropertyInfo
