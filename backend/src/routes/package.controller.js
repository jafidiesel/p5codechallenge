let express = require('express');
let router = express.Router();
//let campaignService = require('../services/campaign.service')
let buildResponse = require('../helpers/common').buildResponse

/* /packages */
router
    .post('/', async function(req,res,next){
        try {
            // req body validation pending using joi
            //let result = await campaignService.newCampaign(req.body);
            
            if(result && result.status == 400){
                res.status = result.status;
                res.send( buildResponse(result.status, result.message, result.data));
            }else if(result && result.status == 200){
                res.send( buildResponse(result.status, result.message, result.data));
            }else{
                next();
            }
        } catch (error) {
            next(error)
        }
    })

module.exports = router;
