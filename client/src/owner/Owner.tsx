import { Button } from "@/components/ui/button"
import HouseCard from "./HouseCard"
import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"

const Owner = () => {
    const [postingModalPop, setPostingModalPop] = useState<boolean>(false)
    const [houseDescription, setHouseDescription] = useState<string>('')
    const [price, setPrice] = useState<number>()
    const [priceNegotiability, setPriceNegotiability] = useState<string>('No')
    const [location, setLocation] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [err, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const baseApiEndpoint = 'http://localhost:8080/api'

    const uploadImage = async () => {
        try {
            console.log(image);
            if (!image) return
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "mnmdsuzg");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dfozbfqvo/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json()
            return data.secure_url
        } catch (error) {
            console.error(error)
        }
    }


    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
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
                throw new Error("Please upload picture of the house")
            }

            const post = await fetch(`${baseApiEndpoint}/properties`, {
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
                setLoading(false)
                throw new Error(data.error)
            }

            setHouseDescription('')
            setPrice(0)
            setLocation('')
            setPhoneNumber(null)
            setImageUrl(null)
            setImage(null)

            setLoading(false)
            setSuccess(true)
        } catch (error) {
            console.error(error instanceof Error ? error.message : String(error))
            setError(error instanceof Error ? error.message : String(error))
            setLoading(false)
        }
    }

    return (
        <div className="mt-4">
            {/* {New property to post} */}
            <div className="flex items-center">
                <p>You want to post a house?</p>

                <Button className="" variant='link' onClick={() => setPostingModalPop(true)}>Click here</Button>
                {postingModalPop &&
                    <div className="fixed inset-0 z-40 flex items-center justify-center">
                        {/* blurred backdrop (click to close) */}
                        <div
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        />
                        {/* modal content (kept sharp above the blurred backdrop) */}
                        <div className="relative z-50 w-[300px] md:w-[450px]  max-w-full ">
                            <div onClick={() => {
                                setHouseDescription('')
                                setPrice(0)
                                setLocation('')
                                setPhoneNumber(null)
                                setImageUrl(null)
                                setPostingModalPop(false)
                                setSuccess(false)
                                setError(null)
                            }}
                                className="text-red-400 text-end">
                                close
                            </div>
                            <div className="bg-white border  p-4 rounded shadow">
                                {success ? (
                                    <div>
                                        <p>Successfully posted!</p>
                                        <p>You can now follow up on the dashboard page</p>
                                    </div>

                                ) : (

                                    <form
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-2 text-sm">
                                        <Input
                                            type="text"
                                            className="text-sm md:text-[16px]"
                                            placeholder="Description"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHouseDescription(e.target.value)} />
                                        <Input
                                            type="number"
                                            className="text-sm md:text-[16px]"
                                            placeholder="Price"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseInt(e.target.value))} />
                                        <fieldset>
                                            <legend>Is price negotiable?</legend>
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
                                        </fieldset>
                                        <Input
                                            type="text"
                                            className="text-sm md:text-[16px]"
                                            placeholder="location"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)} />

                                        <div className="relative">
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
                                        {err && <p className="text-red-500 text-xs">{err}</p>}
                                        {loading ? (
                                            <Button disabled>
                                                <span className="text-xs animate-spin mr-2">p</span>
                                                Submit</Button>
                                        ) : (
                                            <Button type="submit">Submit</Button>
                                        )}
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>}
            </div>
            {/* {Already posted properties by the owner} */}
            <div className="border border-red-400 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {/* <HouseCard />
                <HouseCard />
                <HouseCard />
                <HouseCard />
                <HouseCard /> */}
            </div>
        </div>
    )
}

export default Owner
