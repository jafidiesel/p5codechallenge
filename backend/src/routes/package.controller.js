let express = require('express');
let router = express.Router();
let packageService = require('../services/package.service')
let buildResponse = require('../helpers/common').buildResponse

/* /package */
router
    .post('/', async function(req,res,next){
        try {
            // req body validation pending using joi
            
            let result = await packageService.newPackage(req.body);

            if(result && result.status === 400){
                res.status(result.status).send( buildResponse(result.status, result.message, result.data));
            }else if(result && result.status === 200){
                res.send( buildResponse(result.status, result.message, result.data));
            }else{
                next();
            }
        } catch (error) {
            next(error)
        }
    })
    .get('/', async function(req,res,next){
        try {
            //get all packages 
            // req body validation pending using joi
            let result = await packageService.getAllPackages();
            
            if(result && result.status == 400){
                res.status(result.status).send( buildResponse(result.status, result.message, result.data));
            }else if(result && result.status == 200){
                res.send( buildResponse(result.status, result.message, result.data));
            }else{
                next();
            }
        } catch (error) {
            next(error)
        }
    })
    .get('/:passengerId', async function(req,res,next){
        try {
            //get all packages by passengerID
            // req body validation pending using joi
            let result = await packageService.getAllPackagesByPassenger({passengerId: req.params.passengerId});
            
            if(result && result.status == 400){
                res.status(result.status).send( buildResponse(result.status, result.message, result.data));
            }else if(result && result.status == 200){
                res.send( buildResponse(result.status, result.message, result.data));
            }else{
                next();
            }
        } catch (error) {
            next(error)
        }
    })
    .delete('/:passengerId', async function(req,res,next){
        try {
            //delete all packages by passengerId
            // req body validation pending using joi
            let result = await packageService.withdrawAllPackages({passengerId: req.params.passengerId})
            
            if(result && result.status == 400){
                res.status(result.status).send( buildResponse(result.status, result.message, result.data));
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
