const { Router } = require("express")
const { createClub, getClubs, oneClub, updateClub, deleteClub } = require("../controllers/club.controller.js")
const upload = require("../middlewares/upload.js")
const clubRouter = Router()

clubRouter.post("/add_club",upload.single('logo'), createClub)

clubRouter.get("/clubs", getClubs)

clubRouter.get("/one_club/:id", oneClub)

clubRouter.put("/update_club/:id",upload.single('logo'), updateClub)

clubRouter.delete("/delete_club/:id", deleteClub)


module.exports = clubRouter