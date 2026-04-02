import { sql } from "../config/db.js";
import { ErrorHandler } from "../utils/Error.js";
import { TryCatchHandler } from "../utils/TryCatch.js";

export const addFavorites = TryCatchHandler(async (req, res, next) => {
  const { id } = req.body;
  const userId = req.user.id;
  if (!id) throw new ErrorHandler(400, "property_id required");
  const exists = await sql`
    SELECT 1 FROM favourites
    WHERE user_id = ${userId} AND property_id = ${id}
  `;

  if (exists.length > 0) {
    return res.status(400).json({ message: "Already in favourites" });
  }

  await sql`
    INSERT INTO favourites (user_id, property_id) VALUES (${userId}, ${id})
  `;

  res.json({ message: "Added to the favorites" });
});


export const removeFavorites = TryCatchHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;


  await sql`
      DELETE FROM favourites
      WHERE user_id=${userId} AND property_id=${id}
    `;
  res.json({ message: "Removed" });
})
