const passengerRepository = require('../repositories/passenger.repository');

const newPassenger = async (body) => {
    let result = await passengerRepository.newPassenger(body);

    return result ? { status: 200, message:"Sucess", data: result} : { status: 400, message:"Error", data: result};
}

const getAllPassengers = async () => {
    let result = await passengerRepository.getAllPassengers();

    return result ? { status: 200, message:"Sucess", data: result} : { status: 400, message:"Error", data: result};
}

const getAPassenger = async ( passengerid ) => {
    let result = await passengerRepository.getAPassenger(passengerid);
    return result ? { status: 200, message:"Sucess", data: result} : { status: 400, message:"Error", data: result};
}

const deleteAPassenger = async ( passengerid ) => {
    let result = await passengerRepository.deleteAPassenger(passengerid);
    return result ? { status: 200, message:"Sucess", data: result} : { status: 400, message:"Error", data: result};
}

module.exports = {
    newPassenger,
    getAllPassengers,
    getAPassenger,
    deleteAPassenger
}