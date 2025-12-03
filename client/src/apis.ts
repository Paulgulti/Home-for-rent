import type { PaginatedPropertiesList, Property, PropertyList } from "./types"

const baseApiEndpoint = `http://localhost:8080/api`

export async function fetchPropertyDetail(propertyId: string) {
    try {
        const res = await fetch(`http://localhost:8080/api/properties/${propertyId}`)
        if (!res.ok) {
            throw new Error(`Failed: ${res.statusText}, Please try again later`)
        }
        const data = await res.json() as Property
        return data
    } catch (error) {
        throw error
    }
}

export async function fetchProperties(page: Number, limit: Number) {
    try {
        const res = await fetch(`${baseApiEndpoint}/properties?page=${page}&limit=${limit}`)
        if (!res.ok) {
            throw new Error(`Failed: ${res.statusText}, Please try again later`)
        }
        const data = await res.json() as PaginatedPropertiesList
        return data
    } catch (error) {
        throw error
    }
}

export async function deleteProperty(propertyId: string) {
    try {
        const res = await fetch(`http://localhost:8080/api/properties/property/${propertyId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!res.ok) {
            throw new Error(`Failed: ${res.statusText}, Please try again later`)
        }
        const data = await res.json()
        return data
        
    } catch (error) {
        throw error
    }
}

export async function updateStatus(property: Property) {
    try {
        const updatedProperty = await fetch('http://localhost:8080/api/properties/property', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(property)
        })


        if (!updatedProperty.ok) {
            // try to get server error details if available
            throw new Error(`Failed: ${updatedProperty.statusText}, try again later`)
        }

        const data = await updatedProperty.json()
        return data
    } catch (error) {
        throw error
    }
}