let dbController = require('../db/postgresqlController');

const newPassenger = async (username, flightid) => {
    let result = dbController.postgresClient.tx( async t => {
        const q1 = t.one('INSERT INTO passenger(username,flightid) VALUES($1, $2) RETURNING passengerid', [username, flightid]);
        return await t.batch([q1]);
    })
        .then(data => {
            return data[0];
        })
        .catch(error => {
            new errorHandler.ErrorHandler(400, error.message);
            return new errorHandler.ErrorHandler(400, error.message);
        })
    return result;
}

const getAllPassengers = async () => {
    const result = await dbController.postgresClient.any('SELECT * FROM passenger WHERE $1', [true]);
    return result;
}

const getAPassenger =  async (passengerid) => {
    const result = await dbController.postgresClient.oneOrNone('SELECT * FROM passenger WHERE passengerid = $1',[passengerid]);
    return result;
}

const deleteAPassenger = async ( passengerid ) => {
    let result = dbController.postgresClient.tx( async t => {
        const q1 = t.oneOrNone('DELETE FROM passenger WHERE passengerid = $1 RETURNING passengerid', [passengerid]);
        return await t.batch([q1]);
    })
        .then(data => {
            return data[0];
        })
        .catch(error => {
            new errorHandler.ErrorHandler(400, error.message);
            return new errorHandler.ErrorHandler(400, error.message);
        })
    return result;
}

module.exports = {
    newPassenger,
    getAllPassengers,
    getAPassenger,
    deleteAPassenger
}