module.exports = {
    buildResponse: function (status, msg, data){
        return {
            status: status,
            message: msg,
            data: data
        }
    },
    packageCodeGenerator : (lastPackageCode) => {
        let stringPart = "PA";
        let idPart = lastPackageCode + 1;
        let randomPart = Math.floor(Math.random() * 6) + 1;
        return stringPart + idPart + randomPart;
    }
}
