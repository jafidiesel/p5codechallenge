let dbController = require('../db/postgresqlController');

const newPassenger = async (body) => {
    const result = await dbController.postgresClient.one('INSERT INTO passenger(username,flightid) VALUES($1, $2) RETURNING passengerid', [body.name,body.code])
    
    return result;
}

const getAllPassengers = async () => {
    const result = await dbController.postgresClient.any('SELECT * FROM passenger WHERE $1', [true])
    return result;
}

const getAPassenger =  async (passengerid) => {
    const result = await dbController.postgresClient.one('SELECT * FROM passenger WHERE passengerid = $1',[passengerid]);
    return result;
}

const deleteAPassenger = async ( passengerid ) => {
    const result = await dbController.postgresClient.any('DELETE FROM passenger WHERE passengerid = $1', [passengerid]);
    return result;
}

module.exports = {
    newPassenger,
    getAllPassengers,
    getAPassenger,
    deleteAPassenger
}