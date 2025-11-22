import type { PropertyList } from "@/types"
import { Link } from "react-router"

const HouseCard = ({ houses }: { houses: PropertyList }) => {

  return (
    <>
      {
        houses.map(house=> (
          <div 
            className="border"
            key={house.id}>
            <img className="w-full h-40" src={house.propertyImg} alt="" />
            <div>
              <p className="text-xs lg:text-sm line-clamp-2">{house.description}</p>
              <p className="text-xs lg:text-sm"><span className="font-bold">{house.price}</span>ETB/month</p>
              <p className="text-xs lg:text-sm">{house.location}</p>
              <Link className="text-xs lg:text-sm font-semibold" to={`/properties/${house.id}`}>See more</Link>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default HouseCard
