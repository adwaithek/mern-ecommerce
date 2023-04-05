
import  express from 'express'

import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'

import authRoutes from './routes/authRoute.js'

import CategoryRoutes from './routes/categoryRoutes.js' 
import productRoutes from './routes/productRoute.js'
import cors from 'cors'



import path from 'path'
import { fileURLToPath } from 'url'


dotenv.config()

connectDB();


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);





const app=express()


//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../e-commerce/build')))


//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',CategoryRoutes)
app.use('/api/v1/product',productRoutes)
 
 
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname, '../e-commerce/build/index.html'));
})



const PORT=process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
})