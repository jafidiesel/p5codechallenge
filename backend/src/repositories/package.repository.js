let dbController = require('../db/postgresqlController');
let errorHandler = require('../helpers/error');

const newPackage = async (category, passengerId, packageCode) => {
    
    let result = dbController.postgresClient.tx( async t => {
        const q1 = t.one('INSERT INTO package(category,passengerid, packagecode) VALUES($1, $2, $3) RETURNING packagecode', [category, passengerId, packageCode]);
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

const getAllPackages = async () => {
    const result = await dbController.postgresClient.any('SELECT * FROM package WHERE $1', [true]);
    return result;
}

const getAllPackagesByPassenger = async (passengerid) => {
    const result = await dbController.postgresClient.manyOrNone('SELECT * FROM package WHERE passengerid = $1', [passengerid]);
    return result;
}

const withdrawAllPackages = async (passengerid) => {
    let result = dbController.postgresClient.tx( async t => {
        const q1 = t.many('DELETE FROM package WHERE passengerid = $1 RETURNING packagecode', [passengerid]);
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

const lastPackage = async () => {
    return dbController.postgresClient.oneOrNone("SELECT * FROM package ORDER BY packageid DESC LIMIT 1");
}
module.exports = {
    newPackage,
    getAllPackages,
    withdrawAllPackages,
    lastPackage,
    getAllPackagesByPassenger
}