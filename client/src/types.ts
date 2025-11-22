import z from "zod"

export const PropertySchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  description: z.string(),
  price: z.number(),
  priceNegotiability: z.enum(["Yes", "No"]),
  phoneNumber: z.string(),
  propertyImg: z.url(),
  location: z.string(),
  status: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
})
export const ProperyArraySchema = z.array(PropertySchema)
export const paginatedPropertiesSchema = z.object({
    data: ProperyArraySchema,
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
})
export type PaginatedPropertiesList = z.infer<typeof paginatedPropertiesSchema>
export type Property = z.infer<typeof PropertySchema>
export type PropertyList = z.infer<typeof ProperyArraySchema>