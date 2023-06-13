import { format } from "date-fns";
import {v4}  from 'uuid'
import fs from 'fs'
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fsPromises = fs.promises
export const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
    const logItem = `${dateTime}\t${v4()}\t${message}\n`
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
        await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
}

export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'req.log')
    console.log(`${req.method} ${req.path} ${req.headers.origin}`)
    next()
}

