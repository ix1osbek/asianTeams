const LeagueModels = require("../Schema/league.chema.js")

/////////// POST League
const createLeague = async (req, res) => {
    try {
        const { title, descriptions } = req.body
        const existengTitle = await LeagueModels.findOne({ title });
        if (existengTitle) {
            return res.status(400).json({
                message: "Bunday League mavjud!"
            });
        }
        const league = await LeagueModels.create({ title, descriptions });

        res.status(201).json({
            message: "League muvaffaqiyatli yaratildi!",
            data: league
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
}



//////////////// get leagues

const getLeague = async (req, res) => {
    try {
        const foundetLeague = await LeagueModels.find()
        if (foundetLeague.length === 0) {
            return res.status(404).json({
                message: "Leaguelar topilmadi!"
            })
        }

        res.status(200).json(foundetLeague)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
}



///////// get one league

const getOneLeague = async (req, res) => {
    try {

        const foundetLeague = await LeagueModels.findById(req.params.id)
        if (!foundetLeague) {
            return res.status(404).json({
                message: "League topilmadi!"
            })
        }

        res.status(200).json({
            foundetLeague
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
}


//////// update league

const updateLeague = async (req, res) => {
    try {
        const foundetTitle = await LeagueModels.findOne({ title: req.body.title })

        if (foundetTitle) {
            return res.status(404).json({
                message: "Bu League bazada mavjud!"
            })
        }

        const { id } = req.params.id
        await LeagueModels.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, upsert: true })
        res.status(200).json({
            message: `League yangilandi!`,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
}




/////////// delete league

const deleteLeague = async (req, res) => {
    try {
        const { id } = req.params
        const foundetLeague = await LeagueModels.findById(id)
        if(!foundetLeague){
            return res.status().json({
                message: "Bunday League topilmadi!"
            })
        }

        await LeagueModels.findByIdAndDelete(id)
        res.status(200).json({
            message: `League o'chirildi! `
          })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
}

module.exports = {
    createLeague,
    getLeague,
    getOneLeague,
    updateLeague,
    deleteLeague
}
