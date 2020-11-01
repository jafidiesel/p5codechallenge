var crypto = require('crypto');

module.exports = {
    buildResponse: function (status, msg, data){
        return {
            status: status,
            message: msg,
            data: data
        }
    
    },
    hashGenerator : (player_name) => {
        return crypto.createHash('md5').update(player_name + Math.random() ).digest('hex');
    }
}
