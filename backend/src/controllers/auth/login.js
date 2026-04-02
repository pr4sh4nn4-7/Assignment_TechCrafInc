import { sql } from "../../config/db.js";
import { generateToken } from "../../utils/auth.token.js";
import { ErrorHandler } from "../../utils/Error.js";
import { TryCatchHandler } from "../../utils/TryCatch.js";
import bcrypt from "bcryptjs";

export const Login = TryCatchHandler(async (req, res, next) => {
  const { email, password } = req.body || {}
  if (!req.body || Object.keys(req.body).length < 2) {
    throw new ErrorHandler(400, "All fields are required")
  }
  const user = await sql`
SELECT id,name,email,password FROM users where email=${email}`
  if (user.length <= 0) {
    throw new ErrorHandler(404, "Invalid email or password!!")
  }


  const IsValid = await bcrypt.compare(password, user[0]?.password)
  if (!IsValid) {
    throw new ErrorHandler(404, "Invalid email or password!!")
  }

  const token = generateToken(user[0].id, user[0].name, user[0].email)

  res.json({
    message: "Login successful!!",
    token
  })















})
