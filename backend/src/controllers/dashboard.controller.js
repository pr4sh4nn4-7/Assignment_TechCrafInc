import { TryCatchHandler } from "../utils/TryCatch.js";
import { sql } from "../config/db.js";
import { ErrorHandler } from "../utils/Error.js";

export const Dashboard = TryCatchHandler(async (req, res, next) => {
  const userId = req.user.id;
  const user = await sql`SELECT id,name,email,role FROM users WHERE id=${userId}`;
  if (user.length <= 0) {
    throw new ErrorHandler(404, "User not found")
  }

  const favs = await sql`SELECT property_id FROM favourites WHERE user_id=${userId}`;

  res.json({
    user: user[0],
    favourites: favs.map(f => f.property_id)
  });

})
