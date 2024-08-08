import "dotenv/config";
import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

const createToken = (user) => {
  return sign(
    {
      emailAdd: user.emailAdd,
      pwd: user.pw,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" } 
  );
};

export {
    createToken
}