//credit: https://stackoverflow.com/questions/73441984/typescript-logged-user-data
import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  console.log("Generated Token:", token); // Log the generated token
  return token;
};
