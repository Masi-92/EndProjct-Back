import UserModel from "../models/user.moel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing username and/or password");
  }
  const user = await UserModel.findOne({username:username});

  if (!user) {
    return res.status(400).send("User does not exist");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ msg: "Invalid password" });
  }
  const token = jwt.sign(
    { id: user._id, user: username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.send({ token });
}

export async function register(req, res) {
  const { username, password, fullName, email } = req.body;
  if (!username || !password || !fullName) {
    return res.status(400).send("Missing username and/or password");
  }
  const user = await UserModel.findOne({ $or:[{username},{email}] });

  if (user) {
    return res.status(400).send("Username already exists");
  }
  const hash = await bcrypt.hash(password, 10);

  // oder : UserModel.create(body)
  await UserModel.create({
    username: username,
    email: email,
    password: hash,
    fullName: fullName,
  });
  res.send({ msg: "Useeeeeer createeeeeeeeeeed" });
}
