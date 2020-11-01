const packageRepository = require('../repositories/package.repository');

const newPackage = async (body) => {
    let result = await packageRepository.newPackage(body.category,body.passengerId, body.packageCode);
    if(result && result.packagecode){
        response = {
            status: 200,
            message: "Success",
            data: [result]
        }
    }else{
        response = {
            status: 400,
            message: "There was an error creating package",
            data: [result]
        }
    }
    return response;
}

const getAllPackages = async () => {
    let result = await packageRepository.getAllPackages();
    return result && result.status === 400 ? { status: 400, message:"Error", data: result} : { status: 200, message:"Sucess", data: result};
}

const withdrawAllPackages = async (body) => {
    let result = await packageRepository.withdrawAllPackages(body.passengerId);

    return result && result.status === 400 ? { status: 400, message:"Error", data: result} : { status: 200, message:"Sucess", data: result};

}

module.exports = {
    newPackage,
    getAllPackages,
    withdrawAllPackages
}