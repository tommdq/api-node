import express, { json } from 'express'
import { corsMiddleWare } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'

const app = express()
app.use(json())
app.use(corsMiddleWare())
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
