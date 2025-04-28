const { Router } = require("express")
const { createLeague, getLeague, getOneLeague, updateLeague, deleteLeague } = require("../controllers/league.controller.js")
const leagueRouter = Router()
const upload = require("../middlewares/upload.js")

leagueRouter.post("/add_league", upload.single('logo'), createLeague)
leagueRouter.get("/leagues", getLeague)
leagueRouter.get("/one_league/:id", getOneLeague)
leagueRouter.put("/update_league/:id", upload.single('logo'), updateLeague)
leagueRouter.delete("/delete_league/:id", deleteLeague)


module.exports = leagueRouter