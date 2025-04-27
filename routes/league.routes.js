const {Router} = require("express")
const {createLeague, getLeague, getOneLeague, updateLeague, deleteLeague} = require("../controllers/league.controller.js")
const leagueRouter = Router()

leagueRouter.post("/add_league" , createLeague)
leagueRouter.get("/leagues" , getLeague)
leagueRouter.get("/one_league/:id" , getOneLeague)
leagueRouter.put("/update_league/:id" , updateLeague)
leagueRouter.delete("/delete_league/:id" , deleteLeague)


module.exports = leagueRouter