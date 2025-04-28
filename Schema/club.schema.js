const { Schema, model, Types } = require("mongoose")

const ClubSchema = new Schema({
    league: {
        type: Types.ObjectId,
        ref: "League",
        required: [true, "Ligani kiritish majburiy!"]
    },
    title: {
        type: String,
        required: [true, "Jamoa nomi majburiy!"],
        unique: true,
        trim: true,
        maxlength: [170, "Jamoa nomi 170 belgidan oshmasligi kerak"],
    },
    logo: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})

const ClubModel = model("Club", ClubSchema)
module.exports = ClubModel
