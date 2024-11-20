import express from 'express'
import cors from 'cors'

import marcasRoutes from './routes/marcas'
import carrosRoutes from './routes/carros'
import fotosRoutes from './routes/fotos'
import clientesRoutes from './routes/clientes'
import propostasRoutes from './routes/propostas'
import adminsRoutes from './routes/admins'
import dashboardRoutes from './routes/dashboard'

const app = express()
const port = 3004

app.use(cors({
  origin: 'https://emergentes242-cliente-6hhbo8haq-edecios-projects.vercel.app', // URL da aplicação cliente
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
  credentials: true, // Se a aplicação usa cookies ou sessões
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/marcas", marcasRoutes)
app.use("/carros", carrosRoutes)
app.use("/fotos", fotosRoutes)
app.use("/clientes", clientesRoutes)
app.use("/propostas", propostasRoutes)
app.use("/admins", adminsRoutes)
app.use("/dashboard", dashboardRoutes)

app.get('/', (req, res) => {
  res.send('API: Sistema de Controle de Veículos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})