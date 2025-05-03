const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require("./config/db.js")
const Roterleague = require("./routes/league.routes.js")
const clubRouter = require('./routes/club.routes.js')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.js");

const app = express()
// Swagger UI
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB()
app.use(Roterleague)
app.use(clubRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3003
app.listen(PORT , ()=>{
    console.log(`Server is running at ${PORT}`);

})