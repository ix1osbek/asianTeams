const ClubModel = require("../Schema/club.schema.js")

////////// add club

const createClub = async (req, res) => {
    try {
        const { title, league } = req.body
        if (!title || !league) {
            return res.status(400).json({
                message: "Title va League ID majburiy!"
            })
        }

        const existingClub = await ClubModel.findOne({ title })
        if (existingClub) {
            return res.status(400).json({
                message: "Bu club bazada mavjud!"
            })
        }

        const club = await ClubModel.create({ title, league })

        res.status(201).json({
            message: `Yangi club qo'shildi`,
            data: club
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}


/////// get all clubs

const getClubs = async (req, res) => {
    try {
        const clubs = await ClubModel.find().populate("league") // league (kichik harf)

        if (clubs.length === 0) {
            return res.status(404).json({
                message: "Clublar topilmadi!"
            })
        }

        res.status(200).json(clubs)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}


////////// get one club

const oneClub = async (req, res) => {
    try {
        const { id } = req.params
        const club = await ClubModel.findById(id).populate("league")

        if (!club) {
            return res.status(404).json({
                message: "Bunday club bazada mavjud emas!"
            })
        }

        res.status(200).json(club)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}


///////////// update club

const updateClub = async (req, res) => {
    try {
        const { id } = req.params
        const { title, league } = req.body

        // Tekshir: title unikalmi
        if (title) {
            const existingClub = await ClubModel.findOne({ title })
            if (existingClub && existingClub._id.toString() !== id) {
                return res.status(400).json({
                    message: "Bunday club nomi allaqachon mavjud!"
                })
            }
        }

        const updatedClub = await ClubModel.findByIdAndUpdate(
            id,
            { title, league },
            { new: true, runValidators: true }
        )

        if (!updatedClub) {
            return res.status(404).json({
                message: "Club topilmadi!"
            })
        }

        res.status(200).json({
            message: "Club yangilandi!",
            data: updatedClub
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        })
    }
}


//////////// delete club

const deleteClub = async (req, res) => {
    try {
        const { id } = req.params
        const club = await ClubModel.findByIdAndDelete(id)

        if (!club) {
            return res.status(404).json({
                message: "Bunday club topilmadi!"
            })
        }

        res.status(200).json({
            message: "Club o'chirildi!"
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
    createClub,
    getClubs,
    oneClub,
    updateClub,
    deleteClub
}
