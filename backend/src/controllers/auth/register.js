import { sql } from "../../config/db.js";
import { generateToken } from "../../utils/auth.token.js";
import { ErrorHandler } from "../../utils/Error.js";
import { TryCatchHandler } from "../../utils/TryCatch.js";
import bcrypt from "bcryptjs";

export const Register = TryCatchHandler(async (req, res, next) => {

  const { email, password, newPassword, name } = req.body || {}

  if (!req.body || Object.keys(req.body).length < 4) {
    throw new ErrorHandler(400, "All field are required")
  }

  if (password !== newPassword) {
    throw new ErrorHandler(400, "Password mismatch")
  }

  const user = await sql`
SELECT * FROM users where email=${email}
`
  if (user.length > 0) {
    throw new ErrorHandler(401, "User already Exists!")
  }

  //hashpassword
  const hashpassword = await bcrypt.hash(password, 11)


  const data = await sql`
INSERT INTO users(email,password,name) VALUES (${email},${hashpassword},${name}) 
RETURNING id,email,name
`


  // const token = generateToken(data.id, data.name, data.email)
  res.json({
    message: "Registration successful",
    data
  })

})
