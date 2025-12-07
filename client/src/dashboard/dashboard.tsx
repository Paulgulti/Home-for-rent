import { authClient } from "@/lib/auth-client";
import HouseCard from "@/owner/HouseCard";
import Owner from "@/owner/Owner";
import useFavPropertyStore from "@/stores/favouriteProperty";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { favourites, addToFav, removeFromFav } = useFavPropertyStore()

  return (
    <div className="py-5 md:py-7">
      <Owner/>
      {/* {Saved properties} */}
      <h2>Your recently saved properties</h2>
      {favourites.length > 0 ? (
        <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <HouseCard houses={favourites} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen w-full">
          <p>You haven't saved any properties yet</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard