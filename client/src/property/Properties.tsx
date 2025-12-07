import HouseCard from "../owner/HouseCard"
import { useQueryParams } from "../useQueryParams"
import { Button } from "../components/ui/button"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchProperties } from "../apis"

const Properties = () => {

  const { getParams, updateParams } = useQueryParams()

  const page = Math.max(1, parseInt(getParams('page', '1'), 10) || 1)
  const limit = Math.max(1, parseInt(getParams('limit', '10'), 10) || 10)

  const goToPage = (newPage: number) => {
    updateParams("page", String(newPage));
  };

  const { isPending, isError, error, data: pageData } = useQuery({
    queryKey: ['allProperties', page, limit],
    queryFn: () => fetchProperties(page, limit),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData
  })

  return (
    <div className="py-10 mt-4">
      <p>Properties page</p>
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
        isError ? (
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
          <div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <HouseCard houses={pageData.data} />
            </div>
            {/* Pagination Controls */}
            <div className="flex gap-2.5 mt-8 justify-center">
              <Button className="hover:cursor-pointer" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
                Prev
              </Button>

              <span>Page {page} / {pageData.totalPages}</span>

              <Button disabled={pageData.totalPages <= 1} className="hover:cursor-pointer" onClick={() => goToPage(page + 1)}>
                Next
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Properties
