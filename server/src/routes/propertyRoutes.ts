import express, { Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import prisma from '../prismaClient'

const router = express.Router()

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

router.get('/', async (req: Request, res: Response) => {
    try {
        const houses = await prisma.property.findMany()
        res.status(200).json(houses)
    } catch (error) {
        res.sendStatus(503)
    }
})

export default router