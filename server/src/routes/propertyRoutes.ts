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

        res.status(200).json({ data, total, page, limit, totalPages: Math.ceil(total / limit) })

    } catch (error) {
        res.sendStatus(503)
    }
})

// GET a property by id http://localhost:8080/api/properties/:propertyId

router.get('/:propertyId', async (req: Request, res: Response) => {
    const { propertyId } = req.params
    try {
        const property = await prisma.property.findUnique({
            where: { id: propertyId }
        })
        res.status(200).json(property)
    } catch (error) {
        console.log(error);
        res.sendStatus(503)
    }
})

// GET property by user http://localhost:8080/api/properties/userId

router.get('/user/:userId', requireAuth, async (req: Request, res: Response) => {
    const session = (req as any).session
    const { userId } = req.params

    try {
        const posts = await prisma.property.findMany({
            where: {
                ownerId: session.user.id
            }
        });
        
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.sendStatus(503)
    }
})

// DELETE property by id http://localhost:8080/api/properties/:propertyId

router.delete('/property/:propertyId', requireAuth, async (req: Request, res: Response) => {
    const { propertyId } = req.params    
    try {
        const session = (req as any).session
        const result = await prisma.property.deleteMany({
            where: {
                id: propertyId,
                ownerId: session.user.id
            }
        });
        if (result.count === 0) {
            return res.status(404).json({ message: 'Property not found or not owned by you' })
        }
        
        res.status(200).json({ message: 'Property successfully deleted' })
    } catch (error) {
        console.log(error);
        res.sendStatus(503)
    }
})

export default router
