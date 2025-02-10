import 'dotenv/config'
import express from 'express'
import router from './src/routes/index'
import morgan from 'morgan'
import cors from 'cors'
const app = express()

app.use(express.json())

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1', router)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
