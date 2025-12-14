import useFavPropertyStore from "@/stores/favouriteProperty";
import PropertyCard from "@/property/PropertyCard";

const SavedProperties = () => {
  const { favourites } = useFavPropertyStore()

  return (
    <div className="">
      {/* {Saved properties} */}
      <h2 className="font-semibold">Saved properties</h2>
      {favourites.length > 0 ? (
        <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <PropertyCard houses={favourites} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen w-full">
          <p>You haven't saved any properties yet</p>
        </div>
      )}
    </div>
  )
}

export default SavedProperties