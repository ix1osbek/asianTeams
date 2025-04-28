const ClubModel = require("../Schema/club.schema.js")


////////// add club

const createClub = async (req, res) => {
    try {
        const { title } = req.body
        const foundetTitle = await ClubModel.findOne({ title })
        if (foundetTitle) {
            return res.status(404).json({
                message: "Bu club bazada mavjud!"
            })
        }
        const club = await ClubModel.create({ title })

        res.status(201).json({
            message: `Yangi club qo'shildi:`, club
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
}


/////// get clubs

const getClubs = async (req, res) => {
    try {
        const foundetTitle = await ClubModel.find()
        if (foundetTitle.length === 0) {
            return res.status(404).json({
                message: "Clublar topilmadi!"
            })
        }

        res.status(200).json(foundetTitle)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
}


////////// get one club

const oneClub = async (req, res) => {
    try {
        const id = req.params.id
        const foundetClub = await ClubModel.findById(id)
        if (!foundetClub) {
            return res.status(404).json({
                message: "Bunday club bazada mavjud emas!"
            })
        }

        res.status(200).json(foundetClub)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Serverda xatolik yuz berdi",
            error: error.message
        });
    }
}


///////////// update club

const updateClub = async (req, res) => {
try {
    const id = req.params.id
    const title = req.body
    const foundetTitle = await ClubModel.findOne({ title: req.body.title })

    if (foundetTitle) {
        return res.status(400).json({
            message: "Bunday club bazada mavjud. Club nomlari takrorlanmasligi shart!"
        })
    }
    await ClubModel.findByIdAndUpdate(id, title, { new: true, runValidators: true, upsert: true })
    res.status(201).json({
        message: "Malumotlar yangilandi!"
    })
} catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Serverda xatolik yuz berdi",
        error: error.message
    });
}
}


//////////// delete club

const deleteClub = async (req , res)=>{
    try {
        const id = req.params.id
        const foundetClub = await ClubModel.findById(id)
        if(!foundetClub){
            return res.status(404).json({
                message: "Bunday club bazada topilmadi!"
            })
        }

        await ClubModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "Club muvofaqiyatli o'chirildi!"
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
    createClub,
    getClubs,
    oneClub,
    updateClub,
    deleteClub
}