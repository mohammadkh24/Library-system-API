const { isValidObjectId } = require("mongoose");
const usersModel = require("../models/users");

exports.getAll = async (req, res) => {
  const users = await usersModel.find({}).select("-password");

  return res.json(users);
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "UserID is not valid !!",
    });
  }

  const removedUser = await usersModel.findOneAndDelete({ _id: id });

  if (!removedUser) {
    return res.status(404).json({
      message: "User not found !!",
    });
  }

  return res.status(202).json({
    message: "User removed successfully",
    removedUser,
  });
};

exports.setCrime = async (req, res) => {
  const { id } = req.params;
  const { crime } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "UserID is not valid !!",
    });
  }

  const updatedUser = await usersModel.findOneAndUpdate(
    { _id: id },
    {
      crime,
    }
  );

  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found !!",
    });
  }

  return res.json({
    message: "User crime set successfully",
  });
};

exports.changeRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "UserID is not valid !!",
    });
  }

  const changedRole = await usersModel
    .findOneAndUpdate(
      { _id: id },
      {
        role,
      }
    )
    .select("-password");

  if (!changedRole) {
    res.status(404).json({
      message: "User not found !!"
    });
  }

  return res.status(200).json({
    message : "User role updated successfully",
    changedRole
  })
};
