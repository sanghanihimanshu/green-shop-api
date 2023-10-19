import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();
export const gentoken = async (data) => {
  return {
    authtoken: jwt.sign(
      { email: data.email, password: data.password },
      process.env.TOKEN_SECRET,
      { expiresIn: "10d" }
    ),
    acesstoken: jwt.sign(
      { email: data.email, password: data.password },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" }
    ),
  };
};
export const autenticatetoken = (req, res, next) => {
  try {
    let acesstoken = req.headers["acesstoken"];
    const authtoken = req.headers["authtoken"];
    if (!acesstoken) {
      if (!authtoken) {
          return req.body,next();
    }
      acesstoken = authtoken; 
    } 
      jwt.verify(acesstoken, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return console.log(err.message);;

        req.body = user;
      });
  } catch (error) {
    console.log(error.message);
  }

  next();
};
