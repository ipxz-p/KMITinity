import {logEvents} from "./logger.js";
const errHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'err.log')
    console.log(err.stack)
    const status = res.statusCode ? res.statusCode : 500 // server error 
    res.status(status)
    res.json({ message: err.message })
}

export default errHandler