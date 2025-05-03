const LeagueModels = require("../Schema/league.chema.js")
const uploadToImgBB = require("../utils/uploadToImgBB.js")

/////////// POST League
const createLeague = async (req, res) => {
    try {
        const { league, descriptions } = req.body
        const logoFile = req.file

        if (!league && !descriptions && !logoFile) {
            return res.status(400).json({
                message: "League nomi , ma'lumoti  va logosini kiritish majburiy! "
            })
        }

        const existingLeague = await LeagueModels.findOne({ league })
        if (existingLeague) {
            return res.status(400).json({
                message: "Bunday League allaqachon mavjud!"
            })
        }

        const logoUrl = await uploadToImgBB(logoFile)

        const newLeague = await LeagueModels.create({ league, descriptions, logo: logoUrl })

        res.status(201).json({
            message: "League muvaffaqiyatli yaratildi!",
            data: newLeague
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}

//////////////// GET all Leagues
const getLeague = async (req, res) => {
    try {
        const leagues = await LeagueModels.find()

        if (leagues.length === 0) {
            return res.status(404).json({
                message: "Leaguelar topilmadi!"
            })
        }

        res.status(200).json(leagues)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}

///////// GET one League
const getOneLeague = async (req, res) => {
    try {
        const league = await LeagueModels.findById(req.params.id)
            .populate('clubs') // <<=== Qo‘shdik!

        if (!league) {
            return res.status(404).json({
                message: "League topilmadi!"
            })
        }

        res.status(200).json(league)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}


//////// UPDATE League
const updateLeague = async (req, res) => {
    try {
        const { id } = req.params
        const { league, descriptions } = req.body
        const logoFile = req.file

        const existingLeague = await LeagueModels.findOne({ league })

        if (existingLeague && existingLeague._id.toString() !== id) {
            return res.status(400).json({
                message: "Bunday League allaqachon mavjud!"
            })
        }
        const imgUrl = await uploadToImgBB(logoFile)

        const updatedLeague = await LeagueModels.findByIdAndUpdate(
            id,
            { league, descriptions, logo: imgUrl },
            { new: true, runValidators: true }
        )

        if (!updatedLeague) {
            return res.status(404).json({
                message: "League topilmadi!"
            })
        }

        res.status(200).json({
            message: "League muvaffaqiyatli yangilandi!",
            data: updatedLeague
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}

/////////// DELETE League
const deleteLeague = async (req, res) => {
    try {
        const { id } = req.params

        const league = await LeagueModels.findByIdAndDelete(id)

        if (!league) {
            return res.status(404).json({
                message: "Bunday League topilmadi!"
            })
        }
        res.status(200).json({
            message: "League muvaffaqiyatli o'chirildi!"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}

module.exports = {
    createLeague,
    getLeague,
    getOneLeague,
    updateLeague,
    deleteLeague
}
