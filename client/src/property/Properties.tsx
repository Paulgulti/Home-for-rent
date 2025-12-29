import { useQueryParams } from "../useQueryParams"
import { Button } from "../components/ui/button"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { fetchProperties } from "../apis"
import Footer from "@/LandingComponents/Footer"
import PropertyCard from "./PropertyCard"
import PropertyFilters from "./property-filters"
import { useEffect, useState } from "react"
import { useDebounce } from "@/custom-hook"
import { useSearchParams } from "react-router"

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const debouncedQuery = useDebounce(searchQuery, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const { getParams, updateParams } = useQueryParams()

  const page = Math.max(1, parseInt(getParams('page', '1'), 10) || 1);
  const limit = Math.max(1, parseInt(getParams('limit', '10'), 10) || 10);
  const minPrice = getParams('minPrice', 'any');
  const maxPrice = getParams('maxPrice', 'any');

  const goToPage = (newPage: number) => {
    updateParams("page", String(newPage));
  };

  const { isPending, isError, error, data: pageData } = useQuery({
    queryKey: ['allProperties', page, limit, debouncedQuery, minPrice, maxPrice],
    queryFn: () => fetchProperties(page, limit, debouncedQuery, minPrice, maxPrice),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: debouncedQuery !== null,
  })

  useEffect(() => {
    // Update URL
    if (debouncedQuery) {
      searchParams.set("search", debouncedQuery);
    } else {
      searchParams.delete("search");
    }

    setSearchParams(searchParams);
  }, [debouncedQuery]);

  return (
    <div className="">
      {/* Hero Section */}
      <section className="pt-13 md:pt-16 lg:pt-20 pb-4 md:pb-6 lg:pb-8 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-serif text-xl md:text-2xl lg:text-3xl xl:text-5xl text-foreground mb-2 md:mb-4 animate-fade-up">
              Find Your Perfect Property
            </h1>
            <p className="text-muted-foreground text-md md:text-lg animate-fade-up animation-delay-200 max-w-[400px]">
              Browse our curated selection of premium properties available for rent across the city.
            </p>
          </div>
        </div>
      </section>
      {/* Filters Section */}
      <section className="pb-3 md:pt-6 md:sticky md:top-10 md:z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PropertyFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            propertyType={propertyType}
            onPropertyTypeChange={setPropertyType}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            bedrooms={bedrooms}
            onBedroomsChange={setBedrooms}
          />
        </div>
      </section>
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
          pageData.totalPages === 0 || pageData.data.length === 0 ? (
            <div className="flex w-full h-[25vh] items-center justify-center">
              <div className=" flex flex-col items-center">
                <img
                  className="w-15 h-15"
                  src='/oops.svg' alt="oops img" />
                <p className="text-sm md:text-[16px]">Couldn't find properties you are looking for.</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="md:my-12 px-2">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  <PropertyCard houses={pageData.data} />
                </div>
                {/* Pagination Controls */}
                <div className="flex gap-2.5 mt-8 justify-center mb-10">
                  <Button className="hover:cursor-pointer" disabled={page <= 1} onClick={() => goToPage(page - 1)}>
                    Prev
                  </Button>

                  <span>Page {page} / {pageData.totalPages}</span>

                  <Button disabled={pageData.totalPages <= 1} className="hover:cursor-pointer" onClick={() => goToPage(page + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )
        )
      )}
      <Footer />
    </div>
  )
}

export default Properties
