const { isValidObjectId } = require("mongoose");
const usersModel = require("../models/users");
const registerValidation = require("../validator/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const validationResult = registerValidation(req.body);

  if (!validationResult) {
    res.status(422).json(validationResult);
  }

  const { name, username, email, password, phone } = req.body;

  const isUserExists = await usersModel.findOne({
    $or: [{ username, email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message: "Username or Email is duplicated !!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const countOfUsers = await usersModel.countDocuments();

  const user = await usersModel.create({
    name,
    username,
    email,
    password: hashedPassword,
    phone,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });

  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, "password");

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  return res.status(201).json({
    message: "User register successfully",
    user: userObject,
    accessToken,
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await usersModel.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: "There is not user !!",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Password incorrect !",
    });
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return res.json({ accessToken });
};

exports.getMe = async (req, res) => {
  const user = await usersModel.findById(req.user._id).select("-password")

    if (!user) {
        return res.status(404).json({
            message : "User Not Found !!"
        })
    };

    return res.json(user)
};
