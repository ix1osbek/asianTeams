const mongoose = require("mongoose")

const Schema = mongoose.Schema

const LeagueSchema = new Schema({
    title: {
        type: String,
        unique: [true, "League nomi takrorlanmasligi shart!"],
        required: [true, "Liga nomi majburiy"],
        trim: true,
        maxlength: [100, "Liga nomi 100 ta belgidan oshmasligi kerak"],
    },
    descriptions: {
        type: String,
        required: [true, "Description kiritish majburiy!"],
        maxlength: [500, "Description 500 ta belgidan oshmasligi kerak"]
    }

} , {versionKey: false , timestamps: true})

const LeagueModel = mongoose.model("leagues" , LeagueSchema)
module.exports = LeagueModel