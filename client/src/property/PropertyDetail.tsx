import { fetchPropertyDetail } from "@/apis"
import { publishedDate } from "@/lib/utility"
import useFavPropertyStore from "@/stores/favouriteProperty"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

const PropertyDetail = () => {
  const { favourites, addToFav, removeFromFav } = useFavPropertyStore()
  const { propertyId } = useParams()

  const { data: property, isError, isLoading, error } = useQuery({
    queryKey: ['propertyDetail'],
    queryFn: () => fetchPropertyDetail(propertyId!)
  })

  return (
    <div className="py-10">
      {isLoading ? (
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
          {isError ? (
            <div className="flex h-screen justify-center items-center">
              <div className="flex flex-col items-center">
                <svg viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-25 h-25 md:w-50 md:h-50 si-glyph si-glyph-folder-error" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"> <title>938</title> <defs> </defs> <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g transform="translate(1.000000, 2.000000)" fill="#434343"> <path d="M7.35,3 L5.788,0.042 L2.021,0.042 L2.021,1.063 L0.023,1.063 L0.023,10.976 L1.043,10.976 L1.045,11.976 L15.947,11.976 L15.968,3 L7.35,3 L7.35,3 Z M10.918,9.109 L10.09,9.938 L8.512,8.361 L6.934,9.938 L6.104,9.109 L7.682,7.531 L6.104,5.953 L6.934,5.125 L8.512,6.701 L10.088,5.125 L10.918,5.953 L9.34,7.531 L10.918,9.109 L10.918,9.109 Z" className="si-glyph-fill"> </path>
                      <path d="M13.964,1.982 L13.964,1.042 L8.024,1.042 L8.354,1.982 L13.964,1.982 Z" className="si-glyph-fill"> </path> </g> </g> </g>
                </svg>
                <p className="text-sm text-red-400 md:text-[16px]">{error.message}</p>
              </div>
            </div>
          ) : (
            < div className="mt-4 w-[270px] md:w-[500px] border mx-auto text-sm md:text-[16px]">
              <div>
                <img className="h-[200px] md:h-[500px] w-full" src={property?.propertyImg} alt="" />
              </div>
              <div className="px-1 md:px-2 my-2 flex flex-col gap-1 md:gap-1.3">
                <p className="">{property?.description}</p>
                <div className="flex items-center gap-1 md:gap-1.5">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
                    version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve" fill="#000000">
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
                    <p className="text-end text-xs md:text-[16px]">Posted: {publishedDate(property?.createdAt!)}</p>
                    {property?.status ? (
                      <p className="text-sm text-end">Status: <span className="font-bold">Rented</span></p>
                    ) : (
                      <p className="text-sm text-end">Status: <span className="font-bold">Available</span></p>
                    )}
                  </div>
                </div>
                <div className="">
                  {favourites.find(fav => fav.id === property?.id) ? (
                    <svg
                      onClick={() => removeFromFav(property?.id!)}
                      className="w-5 h-5 cursor-pointer"
                      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier"> <path d="M15.0309 3.30271C13.0299 2.8991 10.9701 2.8991 8.96913 3.30271C6.66186 3.76809 5 5.82231 5 8.20894V18.6292C5 20.4579 6.9567 21.596 8.51221 20.6721L11.3451 18.9895C11.7496 18.7492 12.2504 18.7492 12.6549 18.9895L15.4878 20.6721C17.0433 21.596 19 20.4579 19 18.6292V8.20894C19 5.82231 17.3381 3.76809 15.0309 3.30271Z" fill="#c92c2c"></path> </g>
                    </svg>
                  ) : (
                    <svg
                      onClick={() => addToFav(property!)}
                      className="h-5 w-5 hover:cursor-pointer"
                      viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier"> <path d="M18.5 18.8637V8.07579C18.5 5.99472 17.0378 4.20351 15.0077 3.7977C13.022 3.40077 10.978 3.40077 8.99225 3.7977C6.96219 4.20351 5.5 5.99472 5.5 8.07579V18.8637C5.5 20.1258 6.8627 20.9113 7.94601 20.2737L10.9053 18.5317C11.5814 18.1337 12.4186 18.1337 13.0947 18.5317L16.054 20.2737C17.1373 20.9113 18.5 20.1258 18.5 18.8637Z" fill="#c92c2c" fillOpacity="0.15" stroke="#c92c2c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g>
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