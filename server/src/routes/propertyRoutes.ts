import express, { Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import prisma from '../prismaClient'

const router = express.Router()

// POST a property POST http://localhost:8080/api/properties

router.post('/', requireAuth, async (req: Request, res: Response) => {
    try {
        const { houseDescription,
            price,
            priceNegotiability,
            location,
            phoneNumber,
            imageUrl } = req.body

        const session = (req as any).session

        await prisma.property.create({
            data: {
                ownerId: session.user.id,
                description: houseDescription,
                price,
                priceNegotiability,
                location,
                phoneNumber,
                propertyImg: imageUrl,
                status: false,
            }
        })
        res.status(200).json({ message: "Successfully posted" })
    } catch (error) {
        res.sendStatus(503)
    }
})

// GET all the properties http://localhost:8080/api/properties

// router.get('/', async (req: Request, res: Response) => {
//     try {
//         const houses = await prisma.property.findMany()
//         res.status(200).json(houses)
//     } catch (error) {
//         res.sendStatus(503)
//     }
// })

router.get('/', async (req: Request, res: Response) => {
    try {
        const page = parseInt((req.query.page as string)) || 1;
        const limit = parseInt((req.query.limit as string)) || 10;
        const skip = (page - 1) * limit

        const [data, total] = await Promise.all([
            prisma.property.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.property.count(),
        ])

        res.status(200).json({ data, total, page, limit, totalPages: Math.ceil(total/limit) })

    } catch (error) {
        res.sendStatus(503)
    }
})

export default router

// GET a property by id http://localhost:8080/api/properties/:propertyId

router.get('/:propertyId', async (req: Request, res: Response) => {
    const { propertyId } = req.params
    try {
        const property = await prisma.property.findUnique({
            where: {id: propertyId }
        })
        res.status(200).json(property)
    } catch (error) {
        console.log(error);
        res.sendStatus(503)
    }
})