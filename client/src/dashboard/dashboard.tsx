import HouseCard from "@/owner/HouseCard";
import useFavPropertyStore from "@/stores/favouriteProperty";

const Dashboard = () => {
  const { favourites, addToFav, removeFromFav } = useFavPropertyStore()
  console.log(favourites);

  return (
    <div>
      <h2>Your recently saved properties</h2>
      <div className=" grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <HouseCard houses={favourites} />
      </div>
    </div>
  )
}

export default Dashboard
