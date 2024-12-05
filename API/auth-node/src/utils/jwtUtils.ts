import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export const createJWT = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "30m" });
};

export const verifyJWT = (token: string): any | null => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};
