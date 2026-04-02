import { ErrorHandler } from "../utils/Error.js";
import { TryCatchHandler } from "../utils/TryCatch.js";
import jwt from 'jsonwebtoken'

export const isValidUser = async (req, res, next) => {
  try {

    let token = req.headers.authorization
    console.log(token)
    token = token.split(' ')[1].trim();
    if (!token) throw new ErrorHandler("Invalid auth")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    return res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
  }
}



