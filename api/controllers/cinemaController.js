const mongoose = require('mongoose');
const Cinema = mongoose.model('Cinema');

const getCinemas = async function () {
    try {
        return await Cinema.find();
    } catch (error) {
        throw error
    }
}
const getCinemaById = async function (id) {
    try {
        let cinema = await Cinema.findById(id);
        return cinema;
    } catch (error) {       
        throw error
    }
}
const createCinema = async function (data) {
    try {
        let savedData = new Cinema(data);
        await savedData.save();
        return savedData;
    } catch (error) {
        throw error
    }
}
module.exports = {
    getCinemas: getCinemas,
    createCinema: createCinema,
    getCinemaById: getCinemaById
}