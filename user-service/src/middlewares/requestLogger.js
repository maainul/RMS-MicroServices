import {logger} from "../utils/logger.js"


export const loggingMiddleware = (req, res, next) => {
  const start = Date.now(); // Track request start time

  // Handle response finish
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms - User-Agent: ${req.headers['user-agent']}`;
    
    // Log the request details
    if (res.statusCode >= 400) {
      logger.error(logMessage);
    } else {
      logger.info(logMessage);
    }
  });

  next(); // Proceed to next middleware/route
};
