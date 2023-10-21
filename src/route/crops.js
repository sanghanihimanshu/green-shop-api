import { Router } from "express";
import { Crops } from "../db/schma/crops.js";
import { User } from "../db/schma/signup.js";
import { upload } from "../utils/fileuplode.js";

export const crops = Router();

crops.get("/all", async (req, res) => {
  try {
    const allcrops = await Crops.find({});
    res.send(allcrops);
  } catch (err) {
    res.json(err);
  }
});
crops.post("/user", async (req, res) => {

  try {
    const AvlUser = await User.findOne({ email: req.body.email});
    const allcrops = await Crops.find({ owner: AvlUser._id });
    res.send(allcrops);
    // console.log(allcrops);
  } catch (err) {
    res.json(err);
  }
});
crops.post("/order", async (req, res) => {

  try {
    const allcrops = await Crops.find({ lastbider: req.body.email });
    res.send(allcrops);
    // console.log(allcrops);
  } catch (err) {
    res.json(err);
  }
});
crops.get("/product/:pid", async (req, res) => {
  try {
    const allcrops = await Crops.findById(req.params.pid)
    res.send(allcrops);
    // console.log(allcrops);
  } catch (err) {
    res.json(err);
  }
});
crops.post("/search", async (req, res) => {
  try {
    if (req.body.email != undefined) { 
      const AvlUser = await User.findOne({ email: req.body.email});
      const allcrops = await Crops.find({ owner: AvlUser._id ,name:req.query.searchquery});
    }
    const allcrops = await Crops.find({name:req.query.searchquery});
    res.send(allcrops);
    // console.log(allcrops);
  } catch (err) {
    res.json(err);
  }
});
crops.post("/user/:pid", async (req, res) => {
  try {
    const AvlUser = await User.findOne({ email: req.body.email });
    const allcrops = await Crops.findOne({
      owner: AvlUser._id,
      _id: req.params.pid,
    });
    res.send(allcrops);
  } catch (err) {
    res.json(err);
  }
});
crops.post("/remove", async (req, res) => {
  try {
    const allcrops = await Crops.findOneAndDelete({ _id: req.body.pid });
    res.send(allcrops);
  } catch (err) {
    res.json(err);
  }
});
crops.post("/update", async (req, res) => {
  try {
    const allcrops = await Crops.findOneAndUpdate(
      { _id: req.body.pid },
      req.body
    );
    res.send(await Crops.findOne({ _id: req.body.pid }));
  } catch (err) {
    res.json(err);
  }
});
crops.post("/makebid", async (req, res) => {
  try {
    const allcrops = await Crops.findOneAndUpdate(
      { _id: req.body.id },
      {lastbid:req.body.amount,lastbider:req.body.email,basePrice:req.body.amount}
    );
    res.send(await Crops.findOne({ _id: req.body.id }));
  } catch (err) {
    res.json(err);
  }
});
crops.post("/new",upload.single('image'),async (req, res,next) => {
  try {
    const url = req.protocol + '://' + req.get('host')+ '/public/' + req.file.filename
    const AvlUser = await User.findOne({ email: req.body.email });
    req.body.owner = AvlUser._id;
    req.body.img=url;
    req.body.lastbid=req.body.basePrice
    req.body.lastbider="nobider avalible"
    const newcrop = new Crops(req.body);
    newcrop
      .save()
      .then(() => {   
        res.json(newcrop);
      })
      .catch((e) => {
        res.status(401).json(e.message);
      });
  } catch (err) {
    res.status(401).json(err);
  }
});
