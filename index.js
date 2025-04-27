const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require("./config/db.js")
const Roterleague = require("./routes/league.routes.js")

const app = express()
app.use(cors())
app.use(express.json())
connectDB()
app.use(Roterleague)

const PORT = process.env.PORT || 3003
app.listen(PORT , ()=>{
    console.log(`Server is running at ${PORT}`);

})