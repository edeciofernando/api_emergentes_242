import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/gerais", async (req, res) => {
  try {
    const clientes = await prisma.cliente.count()
    const carros = await prisma.carro.count()
    const propostas = await prisma.proposta.count()
    res.status(200).json({ clientes, carros, propostas })
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/carrosMarca", async (req, res) => {
  try {
    const carros = await prisma.carro.groupBy({
      by: ['marcaId'],
      _count: {
        id: true, 
      }
    })

    // Para cada carro, inclui o nome da marca relacionada ao marcaId
    const carrosMarca = await Promise.all(
      carros.map(async (carro) => {
        const marca = await prisma.marca.findUnique({
          where: { id: carro.marcaId }
        })
        return {
          marca: marca?.nome, 
          num: carro._count.id
        }
      })
    )
    res.status(200).json(carrosMarca)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
