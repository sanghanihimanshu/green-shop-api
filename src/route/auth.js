import { Router } from "express";
import { User } from "../db/schma/signup.js";
import { Mail } from "../utils/mail.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { autenticatetoken, gentoken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

export const auth = Router();
auth.get("/", (req, res) => {
  res.send("you are in auth");
});
auth.get("/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email});
    res.send(user)
  } catch (error) {
    res.status(404).json(error) 
  } 
}); 
auth.post("/signup", async (req, res) => {
  try {
    const registerd = await User.findOne({ email: req.body.email});
    req.body.password = await hashPassword(req.body.password);
    if (!registerd) {
      const NewUser = new User(req.body);
      await Mail(
        req.body.email,
        `http://localhost:5173/auth/verify?token=${jwt.sign(
          { email: NewUser.email, password: NewUser.password },
          process.env.TOKEN_SECRET,
          { expiresIn: "10m" } 
        )}`
      );
      NewUser.save()
        .then(async () => {
          res.json({
            message: "ragistration done",
            email: req.body.email,
            authttoken: await gentoken(NewUser),
          }),
            res.status(200);
        })
        .catch((error) => {
          console.log(error);
          res.status(401).json({
            res: error.message,
          });
        });
    } else {
      res.status(401).json({
        message: "user alredy exist",
        email: registerd.email,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: error,
    });
  }
});

auth.post("/login",autenticatetoken,async (req, res) => {
  if(!req.body.email){
    res.status(401).json({ message: "provide data" })
    return;
  }else{
  try {
    const AvlUser = await User.findOne({ email: req.body.email });
    if (AvlUser) {
      if (comparePassword(AvlUser.password, req.body.password)) {
        res.json({ auth: true, email: AvlUser.email, acesstoken: (await gentoken(AvlUser)).acesstoken, });
        return;
      }
    } else {
      res.status(401).json({ message: "user not avalable" });
      return;
    }
  } catch (error) {
    console.log(error);
    return;
  }
}
});
