const response = (statusCode=500,error=null, data=null) => {
    return {statusCode: statusCode, data: data, error: error}
}

module.exports = response