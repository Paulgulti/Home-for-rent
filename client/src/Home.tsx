import { useEffect, useState } from "react"
import HouseCard from "./owner/HouseCard"
import z from "zod"

const PropertySchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  description: z.string(),
  price: z.number(),
  priceNegotiability: z.enum(["Yes", "No"]),
  phoneNumber: z.string(),
  propertyImg: z.url(),
  location: z.string(),
  status: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
})
const ProperyArraySchema = z.array(PropertySchema)
export type Property = z.infer<typeof PropertySchema>
export type PropertyList = z.infer<typeof ProperyArraySchema>

const Home = () => {
  const [houses, setHouses] = useState<PropertyList>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  const baseApiEndpoint = 'http://localhost:8080/api'
    
  async function fetchHousesForRent() {
    try {
      setLoading(true)
      const res = await fetch(`${baseApiEndpoint}/properties`)
      const data = await res.json()
      const parsedData = ProperyArraySchema.safeParse(data)
      if (!parsedData.success) {
        setError('Invalid data received')
        return
      } else {
        setHouses(parsedData.data)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHousesForRent()
  }, [])


  return (
    <div className="mt-4">
      <p>Home page</p>
      <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <HouseCard houses={houses} />
      </div>
    </div>
  )
}

export default Home
