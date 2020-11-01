let express = require('express');
let router = express.Router();
let passengerService = require('../services/passenger.service');
let buildResponse = require('../helpers/common').buildResponse;

/* /passengers */
router
    .post('/', async function(req,res,next){
        // new passenger
        try {

            // req body validation pending using joi
            
            let result = await passengerService.newPassenger(req.body);
            
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
    .get('/', async function(req, res, next) {
        // get all passengers
        try {
            // req body validation pending using joi

            let result = await passengerService.getAllPassengers();
            
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
    .get('/:passengerId', async function(req, res, next) {
        //  get passenger by passengerId
        try {
            // req body validation pending using joi
            let result = await passengerService.getAPassenger({ passengerId: req.params.passengerId });
            
            if(result && result.status == 400){
                res.status(result.status).send( buildResponse(result.status, result.message, result.data));
            }else if(result && result.status == 200){
                res.send( buildResponse(result.status, result.message, result.data));
            }else{
                next();
            }
        } catch (error) {
            next(error);
        }
    })
    .delete('/:passengerId', async function(req, res, next) {
        //  del a passenger by passengerId
        try {
            // req body validation pending using joi
            let result = await passengerService.deleteAPassenger({ passengerId: req.params.passengerId });
            
            if(result && result.status == 400){
                res.status(result.status).send( buildResponse(result.status, result.message, result.data));
            }else if(result && result.status == 200){
                res.send( buildResponse(result.status, result.message, result.data));
            }else{
                next();
            }
        } catch (error) {
            next(error);
        }
    })

module.exports = router;
