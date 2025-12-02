import type { PaginatedPropertiesList, Property, PropertyList } from "./types"

const baseApiEndpoint = `http://localhost:8080/api`

export async function fetchPropertyDetail(propertyId: string) {
    const res = await fetch(`http://localhost:8080/api/properties/${propertyId}`)
    const data = await res.json() as Property
    return data
}

export async function fetchProperties(page: Number, limit: Number) {
    const res = await fetch(`${baseApiEndpoint}/properties?page=${page}&limit=${limit}`)
    const data = await res.json() as PaginatedPropertiesList
    return data
}

// export async function fetchPropertiesOfUser(userId: string) {
//     const res = await fetch(`${baseApiEndpoint}/properties/user/${userId}`, {
//         credentials: "include"
//     })
//     const data = await res.json() as PropertyList
//     return data
// }

export async function deleteProperty(propertyId: string) {
    console.log(propertyId);
    
    const res = await fetch(`http://localhost:8080/api/properties/property/${propertyId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    console.log(data);
    return data
}