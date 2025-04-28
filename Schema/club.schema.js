const { Schema, default: mongoose } = require("mongoose")

const ClubSchema = new Schema({
    title: {
        type: String,
        unique: [true, "Bunday jamoa bazada mavjud!"],
        trim: true,
        maxlength: [170, "Jamoa nomi 170 ta belgidan oshmasligi kerak"],
    }
}, { versionKey: false, timestamps: true })


const ClubModel = mongoose.model("Clubs" , ClubSchema)
module.exports = ClubModel