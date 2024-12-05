import jwt from "jsonwebtoken";


export const createJWT = (payload: object): string => {
  const secret = "process.env.JWT_SECRET";


  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign(payload, secret, { expiresIn: "2h" });
};


export const verifyJWT = (token: string): any | null => {
  try {
    const secret = "process.env.JWT_SECRET";

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};
