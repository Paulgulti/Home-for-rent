import { PropertySchema,type Property } from "@/types"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const Property = () => {
  const [property, setProperty] = useState<Property>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const params = useParams()
  async function fetchProperty() {
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:8080/api/properties/${params.propertyId}`)
      if (!res.ok) {
        throw new Error(`Server error ${res.status}`)
      }
      const data = await res.json()
      const parsedData = PropertySchema.safeParse(data)
      if (!parsedData.success) {
        console.error(parsedData.error)
        return
      }
      setProperty(parsedData.data)
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : 'Unknown error please refresh')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperty()
  }, [])
  return (
    <div>
      {/* {Full description of the property} */}
      <div>
        <p>{property?.description}</p>
      </div>
    </div>
  )
}

export default Property