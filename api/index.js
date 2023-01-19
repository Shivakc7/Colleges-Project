const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users.js')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const multer = require('multer')
const path = require("path")

const connectDB = require('./db/connect')
require('dotenv').config()

// mongoose.connect(process.env.MONGO_URL, () => {
//     console.log('connected to database')
// })
// middlewares

app.use("/images", express.static(path.join(__dirname, "public/images")))

app.use(express.json());
app.use(helmet())
app.use(morgan('common'))


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

const storage = multer.diskStorage({
  destination: (req,file,cb) =>  {
    cb(null, "public/images")
  },
  filename: (req,file,cb) => {
    cb(null, req.body.name)
  }
})
const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (req,res) => {
  try {
    return res.status(200).json("File uploaded succesfully")
  } catch (error) {
    console.log(error)
    
  }
})

 
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URL);
      app.listen(8800, console.log(`server is listening on port 8800...`));
    } catch (error) {
      console.log(error);
    }
  };
  
  start();