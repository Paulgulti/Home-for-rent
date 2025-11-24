import { timeAgo } from "@/lib/utils"
import { PropertySchema, type Property } from "@/types"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const PropertyDetail = () => {
  const [property, setProperty] = useState<Property>()
  const [publishedDate, setPublishedDate] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [favourite, setFavourite] = useState<boolean>(false)

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
        setError('Invalid data received')
        return
      }
      setProperty(parsedData.data)
      const date = timeAgo(parsedData.data.createdAt)
      setPublishedDate(date)
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
          {error ? (
            <div>{error}</div>
          ) : (
            < div className="mt-4 w-[270px] md:w-[500px] border mx-auto text-sm md:text-[16px]">
              <div>
                <img className="h-[200px] md:h-[500px] w-full" src={property?.propertyImg} alt="" />
              </div>
              <div className="px-1 md:px-2 my-2">
                <p className="">{property?.description}</p>
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3"
                    version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xmlSpace="preserve" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <g> <path fill="#231F20" d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64 s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M32,38c-7.732,0-14-6.268-14-14 s6.268-14,14-14s14,6.268,14,14S39.732,38,32,38z"></path> <path fill="#231F20" d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34 c-5.523,0-10-4.478-10-10s4.477-10,10-10s10,4.478,10,10S37.523,34,32,34z"></path> </g>
                    </g>
                  </svg>
                  <p>{property?.location}</p>
                </div>
                <div>
                  <p className="">{property?.price} ETB/month</p>
                  {property?.priceNegotiability === 'Yes' ? (
                    <p className="leading-1.5 text-sm font-light text-green-400">Open for negotiation</p>
                  ) : (
                    <p className="leading-1.5 text-sm font-light text-red-400">Non-negotiable</p>
                  )}
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier"> <path opacity="0.15" d="M20.9994 16.4767V19.1864C21.0036 20.2223 20.0722 21.0873 19.0264 20.9929C10 21 3 13.935 3.00706 4.96919C2.91287 3.92895 3.77358 3.00106 4.80811 3.00009H7.52325C7.96247 2.99577 8.38828 3.151 8.72131 3.43684C9.66813 4.24949 10.2771 7.00777 10.0428 8.10428C9.85987 8.96036 8.9969 9.55929 8.41019 10.1448C9.69858 12.4062 11.5746 14.2785 13.8405 15.5644C14.4272 14.9788 15.0273 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.8579 15.6021 21.0104 16.0337 20.9994 16.4767Z" fill="#000000"></path> <path d="M14.5 6.5C15.2372 6.64382 15.9689 6.96892 16.5 7.5C17.0311 8.03108 17.3562 8.76284 17.5 9.5M15 3C16.5315 3.17014 17.9097 3.91107 19 5C20.0903 6.08893 20.8279 7.46869 21 9M20.9994 16.4767V19.1864C21.0036 20.2223 20.0722 21.0873 19.0264 20.9929C10 21 3 13.935 3.00706 4.96919C2.91287 3.92895 3.77358 3.00106 4.80811 3.00009H7.52325C7.96247 2.99577 8.38828 3.151 8.72131 3.43684C9.66813 4.24949 10.2771 7.00777 10.0428 8.10428C9.85987 8.96036 8.9969 9.55929 8.41019 10.1448C9.69858 12.4062 11.5746 14.2785 13.8405 15.5644C14.4272 14.9788 15.0273 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.8579 15.6021 21.0104 16.0337 20.9994 16.4767Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></g>
                    </svg>
                    <p>{property?.phoneNumber}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-end">Posted: {publishedDate}</p>
                    {property?.status ? (
                      <p className="text-sm text-end">Status: <span className="font-bold">Rented</span></p>
                    ) : (
                      <p className="text-sm text-end">Status: <span className="font-bold">Available</span></p>
                    )}
                  </div>
                </div>
                <div className="">
                  {favourite ? (
                    <svg
                      className="w-5 h-5"
                      fill="#c92c2c" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 370 370" xmlSpace="preserve" stroke="#c92c2c">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier"> <path d="M339.266,65.896c-19.837-19.828-46.206-30.748-74.254-30.748c-16.248,0-31.708,3.528-45.949,10.487l-34.059,16.648 l-34.07-16.653c-14.237-6.955-29.694-10.483-45.939-10.483c-28.051,0-54.427,10.926-74.273,30.767 c-19.649,19.652-30.56,45.805-30.72,73.64c-0.16,27.803,10.422,54.059,29.798,73.93c0.824,0.845,1.68,1.662,2.565,2.441 l121.031,106.963c9.026,7.976,20.316,11.965,31.606,11.965c11.29,0,22.58-3.989,31.606-11.965l121.043-106.972 c0.888-0.787,1.748-1.602,2.576-2.454c19.365-19.874,29.939-46.127,29.772-73.93C369.831,111.702,358.92,85.555,339.266,65.896z"></path> </g>
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 249.3 249.3" xmlSpace="preserve" fill="#c92c2c">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier"> <path d="M249.183,88.644c-0.94-17.571-8.379-34.07-20.947-46.458c-12.756-12.574-29.414-19.499-46.904-19.499 c-26.191,0-44.735,20.23-54.697,31.099c-0.567,0.618-1.176,1.282-1.771,1.924c-0.319-0.362-0.636-0.723-0.938-1.067 C114.82,44.27,95.87,22.687,67.972,22.687c-17.49,0-34.147,6.925-46.903,19.499C8.5,54.574,1.061,71.073,0.121,88.644 c-0.934,17.467,3.507,32.624,14.396,49.146c9.759,14.811,35.173,38.228,53.97,53.78c19.32,15.986,44.767,35.042,56.272,35.042 c11.686,0,37.043-19.016,56.256-34.968c18.651-15.485,43.925-38.883,53.775-53.86C242.119,126.64,250.379,110.983,249.183,88.644z M222.258,129.542c-7.157,10.885-27.331,30.995-50.201,50.044c-27.269,22.714-43.414,31.666-47.286,32.022 c-3.866-0.403-20.051-9.445-47.453-32.201c-23.004-19.104-43.208-39.146-50.276-49.871c-9.011-13.672-12.694-26.036-11.943-40.092 c1.527-28.539,25.246-51.758,52.872-51.758c21.107,0,36.443,17.468,44.683,26.851c4.844,5.518,7.513,8.557,11.999,8.557 c4.631,0,7.618-3.259,13.04-9.174c8.994-9.813,24.047-26.234,43.639-26.234c27.627,0,51.345,23.219,52.873,51.758 C234.965,103.659,231.392,115.652,222.258,129.542z"></path> </g>
                    </svg>
                  )}
                </div>
              </div>
            </div >
          )}
        </div>
      )
      }
    </div >
  )
}

export default PropertyDetail