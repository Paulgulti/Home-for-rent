import { useEffect, useState } from "react"
import HouseCard from "./owner/HouseCard"
import { paginatedPropertiesSchema, ProperyArraySchema, type PropertyList } from "./types"
import { useQueryParams } from "./useQueryParams"
import { Button } from "./components/ui/button"


const Properties = () => {
  const [houses, setHouses] = useState<PropertyList>([])
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const baseApiEndpoint = 'http://localhost:8080/api'

  const { getParams, updateParams } = useQueryParams()
  const page = Math.max(1, parseInt(getParams('page', '1'), 10) || 1)
  const limit = Math.max(1, parseInt(getParams('limit', '10'), 10) || 10)
  const goToPage = (newPage: number) => {
    updateParams("page", String(newPage));
  };

  async function fetchHousesForRent() {

    try {
      setLoading(true)
      const res = await fetch(`${baseApiEndpoint}/properties?page=${page}&limit=${limit}`)
      if (!res.ok) {
        throw new Error(`Server error ${res.status}`)
      }
      const data = await res.json()
      const parsedData = paginatedPropertiesSchema.safeParse(data)
      if (!parsedData.success) {
        setError('Invalid data received')
        setHouses([])
        return
      } else {
        setHouses(parsedData.data.data)
        setTotalPages(parsedData.data.totalPages)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error')
      setHouses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHousesForRent()
  }, [page, limit])


  return (
    <div className="mt-4">
      <p>Properties page</p>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <svg
            className="w-10 h-10 animate-spin "
            viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g>
          </svg>
        </div>
      ) : (
        <div>
          <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <HouseCard houses={houses} />
          </div>
          {/* Pagination Controls */}
          <div className="flex gap-2.5 mt-8 justify-center">
            <Button className="hover:cursor-pointer" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
              Prev
            </Button>

            <span>Page {page} / {totalPages}</span>

            <Button className="hover:cursor-pointer" onClick={() => goToPage(page + 1)}>
              Next
            </Button>
          </div>
        </div>

      )}
    </div>
  )
}

export default Properties
