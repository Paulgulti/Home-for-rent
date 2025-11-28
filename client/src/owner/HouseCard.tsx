import useFavPropertyStore from "@/stores/favouriteProperty"
import type { PropertyList } from "@/types"
import { Link } from "react-router"

const HouseCard = ({ houses }: { houses: PropertyList }) => {

  const { favourites, addToFav, removeFromFav } = useFavPropertyStore()
  console.log(favourites);


  return (
    <>
      {
        houses.map(house => (
          <div
            className="border"
            key={house.id}>
            <img className="w-full h-40" src={house.propertyImg} alt="" />
            <div>
              <p className="text-xs lg:text-sm line-clamp-2">{house.description}</p>
              <p className="text-xs lg:text-sm"><span className="font-bold">{house.price}</span>&nbsp;<i>ETB/month</i></p>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3"
                  version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve" fill="#000000">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"> <g> <path fill="#231F20" d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64 s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M32,38c-7.732,0-14-6.268-14-14 s6.268-14,14-14s14,6.268,14,14S39.732,38,32,38z"></path> <path fill="#231F20" d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34 c-5.523,0-10-4.478-10-10s4.477-10,10-10s10,4.478,10,10S37.523,34,32,34z"></path> </g>
                  </g>
                </svg>
                <p>{house?.location}</p>
              </div>
              <div className="">
                {favourites.find(fav => fav.id === house.id) ? (
                  <svg
                    onClick={() => removeFromFav(house.id)}
                    className="w-5 h-5 cursor-pointer"
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <path d="M15.0309 3.30271C13.0299 2.8991 10.9701 2.8991 8.96913 3.30271C6.66186 3.76809 5 5.82231 5 8.20894V18.6292C5 20.4579 6.9567 21.596 8.51221 20.6721L11.3451 18.9895C11.7496 18.7492 12.2504 18.7492 12.6549 18.9895L15.4878 20.6721C17.0433 21.596 19 20.4579 19 18.6292V8.20894C19 5.82231 17.3381 3.76809 15.0309 3.30271Z" fill="#c92c2c"></path> </g>
                  </svg>
                ) : (
                  <svg
                    onClick={() => addToFav(house)}
                    className="h-5 w-5 hover:cursor-pointer"
                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <path d="M18.5 18.8637V8.07579C18.5 5.99472 17.0378 4.20351 15.0077 3.7977C13.022 3.40077 10.978 3.40077 8.99225 3.7977C6.96219 4.20351 5.5 5.99472 5.5 8.07579V18.8637C5.5 20.1258 6.8627 20.9113 7.94601 20.2737L10.9053 18.5317C11.5814 18.1337 12.4186 18.1337 13.0947 18.5317L16.054 20.2737C17.1373 20.9113 18.5 20.1258 18.5 18.8637Z" fill="#c92c2c" fillOpacity="0.15" stroke="#c92c2c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                  </svg>
                )}
              </div>
              <Link className="text-xs lg:text-sm font-semibold" to={`/properties/${house.id}`}>See more</Link>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default HouseCard
