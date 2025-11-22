import { useEffect, useState } from "react"
import HouseCard from "./owner/HouseCard"
import { paginatedPropertiesSchema, ProperyArraySchema, type PropertyList } from "./types"


const Home = () => {
  const [houses, setHouses] = useState<PropertyList>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const baseApiEndpoint = 'http://localhost:8080/api'

  async function fetchHousesForRent() {
    try {
      setLoading(true)
      const res = await fetch(`${baseApiEndpoint}/properties`)
      if (!res.ok) {
        throw new Error(`Server error ${res.status}`)
      }
      const data = await res.json()
      const parsedData = paginatedPropertiesSchema.safeParse(data)
      if (!parsedData.success) {
        setError('Invalid data received')
        return
      } else {
        setHouses(parsedData.data.data)
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
      <p>Properties page</p>
      <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <HouseCard houses={houses} />
      </div>
    </div>
  )
}

export default Home
