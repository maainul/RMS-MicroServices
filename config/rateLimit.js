// config/rateLimit.js
import rateLimit from 'express-rate-limit';

export const createRateLimiter = ({ windowMs, max }) => rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, slow down!',
});
