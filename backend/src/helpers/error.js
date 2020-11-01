class ErrorHandler extends Error{
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { status, message } = err;
    console.log("err", err.status, err);
    
    res.status(status).json({
        status: "error",
        status,
        message
    });
}

module.exports = {
    ErrorHandler,
    handleError
}