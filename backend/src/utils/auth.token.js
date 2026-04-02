import jwt from 'jsonwebtoken'
import 'dotenv/config'


export const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}



