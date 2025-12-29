import { Button } from "@/components/ui/button"
import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Textarea } from "@/components/ui/textarea"
import { Building2, X } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

type PostPropertyProps = {
    setPostingModalPop: React.Dispatch<React.SetStateAction<boolean>>,
}

const Owner = ({ setPostingModalPop }: PostPropertyProps) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [houseDescription, setHouseDescription] = useState<string>('')
    const [price, setPrice] = useState<number>()
    const [priceNegotiability, setPriceNegotiability] = useState<string>('No')
    const [location, setLocation] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
    const [image, setImage] = useState<File | null>(null);
    // const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [err, setError] = useState<string | null>(null)
    // const [loading, setLoading] = useState<boolean>(false)
    // const [success, setSuccess] = useState<boolean>(false)


    const queryClient = useQueryClient()

    const uploadImage = async () => {
        try {
            console.log(image);
            if (!image) {
                setError("Please upload picture of the property")
                return
            }
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "mnmdsuzg");

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dfozbfqvo/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!response.ok) {
                setError('Network error')
            }
            const data = await response.json()
            return data.secure_url
        } catch (error) {
            console.error(error)
            setError(error instanceof Error ? error.message : 'Unknown error')
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // setLoading(true)
        try {
            // if (!session) throw new Error('Make sure you have logged in before submitting!')

            if (!houseDescription || houseDescription.trim() == '') {
                throw new Error("Please enter appropriate description of the house!")
            }
            setHouseDescription(houseDescription)
            if (!price || price <= 0) {
                throw new Error("Please enter pricing!")
            }
            setPrice(price)
            setPriceNegotiability(priceNegotiability)
            if (!location || location.trim() == "") {
                throw new Error("Please enter location!")
            }
            setLocation(location)
            if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 10) {
                throw new Error("Please enter a valid 10 digit phone number!")
            }

            setPhoneNumber(phoneNumber)

            const uploadedUrl = await uploadImage()
            if (!uploadedUrl) {
                throw new Error("Couldn't get image file!")
            }

            const post = await fetch(`${API_URL}/api/properties`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    houseDescription,
                    price,
                    priceNegotiability,
                    location,
                    phoneNumber,
                    imageUrl: uploadedUrl
                })
            })

            const data = await post.json()
            if (data.error) {
                // setLoading(false)
                throw new Error(data.error)
            }

            setHouseDescription('')
            setPrice(0)
            setLocation('')
            setPhoneNumber(null)
            // setImageUrl(null)
            setImage(null)

            // setLoading(false)
            // setSuccess(true)
        } catch (error) {
            console.error(error instanceof Error ? error.message : String(error))
            setError(error instanceof Error ? error.message : String(error))
            // setLoading(false)
            throw error
        }
    }

    const uploadMutation = useMutation({
        mutationFn: handleSubmit,
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['userProperties'] }),
                queryClient.invalidateQueries({ queryKey: ['allProperties'] }),
            ]),
                toast("You have successfully posted your property")
            setPostingModalPop(false)
        }
    })
    return (
        <div
            className='py-20 fixed bg-black/50 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0' >
            <div className='bg-white p-4 relative w-[80%] md:w-[35%] max-h-[400px] md:max-h-full overflow-y-auto my-6 md:my-0 rounded-md md:rounded-xl'>
                <button
                    className='cursor-pointer absolute top-2 right-2'
                    onClick={() => {
                        setError(null)
                        setPostingModalPop(false)
                    }}
                >
                    <X className="h-6 w-6" />
                </button>
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Building2 className="h-8 w-8 text-primary" />
                    <span className="font-serif text-xl lg:text-2xl text-foreground">Akeray</span>
                </div>
                <form
                    onSubmit={uploadMutation.mutate}
                    className="flex flex-col gap-2 text-sm">
                    <div>
                        <label className="" htmlFor="">Property description</label>
                        <Textarea
                            className="text-sm md:text-[16px] "
                            placeholder="Description"
                            onChange={(e) => setHouseDescription(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Set price</label>
                        <Input
                            type="number"
                            className="text-sm md:text-[16px]"
                            placeholder="Price"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseInt(e.target.value))} />
                    </div>

                    <fieldset>
                        <legend>Is price negotiable?</legend>
                        <div className="flex gap-10">
                            <div className="flex items-center gap-1.5">
                                <input
                                    id="price-negotiable"
                                    name="price"
                                    type="radio"
                                    value="Yes"
                                    checked={priceNegotiability == 'Yes'}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriceNegotiability(e.target.value)}
                                />
                                <label htmlFor="price-negotiable">Yes</label>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <input
                                    id="price-non-negotiable"
                                    name="price"
                                    type="radio"
                                    value="No"
                                    checked={priceNegotiability == 'No'}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriceNegotiability(e.target.value)}
                                />
                                <label htmlFor="price-non-negotiable">No</label>
                            </div>
                        </div>
                    </fieldset>
                    <div>
                        <label htmlFor="">Location</label>
                        <Input
                            type="text"
                            className="text-sm md:text-[16px]"
                            placeholder="location"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Phone number</label>
                        <Input
                            type="text"
                            className="text-sm md:text-[16px]"
                            placeholder="092040******"
                            value={phoneNumber ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value
                                if (/^\d*$/.test(value)) {
                                    setPhoneNumber(value);
                                }
                            }
                            } />
                    </div>
                    <Input
                        type="file"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) setImage(file);
                        }}
                    />
                    {uploadMutation.error && <p className="text-red-500 text-xs">{err}</p>}
                    {/* {uploadMutation.isPending ? (
                        <Button disabled>
                            Submit</Button>
                    ) : (
                    )} */}
                    <Button disabled={uploadMutation.isPending} className="hover:cursor-pointer" type="submit">
                        {uploadMutation.isPending && (
                            <Spinner />)}
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Owner
