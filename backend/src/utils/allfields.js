import { ErrorHandler } from "./Error.js"

export const AllRequiredFields = (req, numberoffieldsrequired) => {
  if (!req.body || Object.keys(req.body).length < numberoffieldsrequired)
    throw new ErrorHandler(400, "All fields are required")
}
