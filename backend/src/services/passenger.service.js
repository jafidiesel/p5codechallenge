const passengerRepository = require('../repositories/passenger.repository');

const newPassenger = async (body) => {
    let result = await passengerRepository.newPassenger(body.username, body.flightId);
    if(result && result.passengerid){
        response = {
            status: 200,
            message: "Success",
            data: result
        }
    }else{
        response = {
            status: 400,
            message: "There was an error creating passenger",
            data: [result]
        }
    }
    return response;
}

const getAllPassengers = async () => {
    let result = await passengerRepository.getAllPassengers();
    
    if(result && result.length){
        response = {
            status: 200,
            message: "Success",
            data: result
        }
    }else{
        response = {
            status: 400,
            message: "No Passengers listed.",
            data: [result]
        }
    }
    return response;
}

const getAPassenger = async ( body ) => {
    let result = await passengerRepository.getAPassenger(body.passengerId);
    let response;

    if(result && result.passengerid){
        response = {
            status: 200,
            message: "Success",
            data: [result]
        }
    }else{
        response = {
            status: 400,
            message: "No matching passenger",
            data: [result]
        }
    }
    return response;
}

const deleteAPassenger = async ( body ) => {
    let result = await passengerRepository.deleteAPassenger(body.passengerId);
    if(result && result.passengerid){
        response = {
            status: 200,
            message: "Success",
            data: [result]
        }
    }else{
        response = {
            status: 400,
            message: "No matching passenger",
            data: [result]
        }
    }
    return response;
}

module.exports = {
    newPassenger,
    getAllPassengers,
    getAPassenger,
    deleteAPassenger
}