import * as winston from "winston";
import { environment } from "../../config/config";
const logLevel = environment === 'development' ? 'debug' : 'warn';

const file = new winston.transports.File({
  filename: "projectLogs.log",
  level: logLevel,
  handleExceptions: true,
});

export default winston.createLogger({
    level: logLevel,
    transports: [
      file
    ]
  });
