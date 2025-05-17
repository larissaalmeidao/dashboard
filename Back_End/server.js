import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes.js'

dotenv.config()

// Criar pastas se não existirem
const uploadDir = path.join(process.cwd(), 'uploads');
const profPicDir = path.join(process.cwd(), 'uploads-profpic');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
if (!fs.existsSync(profPicDir)) fs.mkdirSync(profPicDir, { recursive: true });

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: '*'
}));
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use('/uploads-profpic', express.static('uploads-profpic'))
app.use("/api", routes)


//Conexão
app.listen(port, ()=> {
    console.log(`Servidor rodando em: http://localhost:${port}`)
})

