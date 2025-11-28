import type { Property } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware';


interface FavouritesState {
    favourites: Property[],
    addToFav: (property: Property) => void,
    removeFromFav: (propertyId: string) => void
}

const useFavPropertyStore = create<FavouritesState>()(
    persist((set) => ({

        favourites: [],
        addToFav: (property) =>
            set((state) => {
                return {
                    favourites: [
                        ...state.favourites,
                        {
                            id: property.id,
                            ownerId: property.ownerId,
                            description: property.description,
                            price: property.price,
                            priceNegotiability: property.priceNegotiability,
                            phoneNumber: property.phoneNumber,
                            propertyImg: property.propertyImg,
                            location: property.location,
                            status: property.status,
                            createdAt: property.createdAt,
                            updatedAt: property.updatedAt,
                        }
                    ]
                }
            }),
        removeFromFav: (propertyId) =>
            set((state) => {
                return {
                    favourites: state.favourites.filter(fav => fav.id !== propertyId)
                }
            })
    
    }), {
        name: 'Save-property',
    }));

export default useFavPropertyStore;