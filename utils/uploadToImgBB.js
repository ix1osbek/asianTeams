const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const uploadImage = async (file) => {
    try {
        // ImgBB API tokenini kiriting
        const API_KEY = process.env.IMGBB_API_KEY
        const form = new FormData();
        form.append('image', file.buffer.toString('base64')); // Faylni base64 formatida yuborish

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, form, {
            headers: {
                ...form.getHeaders(),
            }
        });

        // ImgBB javobidan rasm URL'sini qaytarish
        return response.data.data.url;
    } catch (error) {
        console.error('ImgBB upload error:', error);
        throw new Error('Rasmni ImgBB ga yuklashda xatolik yuz berdi');
    }
};


module.exports = uploadImage
