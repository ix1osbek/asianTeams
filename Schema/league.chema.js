const { Schema, model } = require("mongoose")

const LeagueSchema = new Schema({
    league: {
        type: String,
        required: [true, "League nomi majburiy!"],
        unique: true,
        trim: true,
        maxlength: [170, "League nomi 170 belgidan oshmasligi kerak"],
    },
    descriptions: {
        type: String,
        trim: true,
        maxlength: [500, "League tavsifi 500 belgidan oshmasligi kerak"]
    },
    logo: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

LeagueSchema.virtual('clubs', {
    ref: 'Club',
    localField: '_id',
    foreignField: 'league',
})

const LeagueModel = model("League", LeagueSchema)
module.exports = LeagueModel
