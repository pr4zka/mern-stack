import express from "express";
import morgan from "morgan";
import fileupload from 'express-fileupload'
import postRoutes from './routes/post.routes.js'
import {dbConnect} from './db.js'
import cors from 'cors'
import { dirname, join } from 'path'
import {fileURLToPath} from 'url'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

//middlewares
app.use(cors({
    origin: '*'
}))
app.use(morgan("dev"));
app.use(express.json())
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: './uplaod'
}))

//routes
app.use(postRoutes)
app.use(express.static(join(__dirname, '../client/dist')))

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'))
})

//server
app.listen(process.env.PORT || 3000);
console.log(`Server is running on port ${process.env.PORT}`);
dbConnect()