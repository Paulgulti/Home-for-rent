import { useNavigate } from "react-router"
import type { PaginatedPropertiesList, Property, PropertyList, UpdatedProperty } from "./types"

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPropertyDetail(propertyId: string) {
    try {
        const res = await fetch(`${API_URL}/api/properties/${propertyId}`)
        if (!res.ok) {
            throw new Error(`Failed: ${res.statusText}, Please try again later`)
        }
        const data = await res.json() as Property
        return data
    } catch (error) {
        throw error
    }
}

export async function fetchProperties(page: Number, limit: Number, search: string, minPrice: string, maxPrice: string) {
    try {
        const res = await fetch(`${API_URL}/api/properties?page=${page}&limit=${limit}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
        if (!res.ok) {
            throw new Error(`Failed: ${res.statusText}, Please try again later`)
        }
        const data = await res.json() as PaginatedPropertiesList
        return data
    } catch (error) {
        throw error
    }
}

export async function fetchPropertiesByUser(userId: string) {
    const navigate = useNavigate()

    try {
        const res = await fetch(`${API_URL}/api/properties/user/${userId}`, {
            credentials: 'include'
        })
        if (res.status === 401) {
            navigate('/login')
            return
        }
        if (!res.ok) {
            throw new Error(`Failed: ${res.statusText}, Please try again later`)
        }
        const data = await res.json() as PropertyList
        return data
    } catch (error) {
        throw error
    }
}

export async function deleteProperty(propertyId: string) {
    try {
        const res = await fetch(`${API_URL}/api/properties/property/${propertyId}`, {
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
        const updatedProperty = await fetch(`${API_URL}/api/properties/property`, {
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

export async function updatePropertyInfo(property: UpdatedProperty) {
    try {
        const updatedProperty = await fetch(`${API_URL}/api/properties/property/:id`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(property)
        });
        if (!updatedProperty.ok) {
            throw new Error(`${updatedProperty.statusText}, try again later`)
        }
        const data = await updatedProperty.json()
        return data
    } catch (error) {
        throw error
    }
}