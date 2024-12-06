const url = require("url");

const UserModel = require("./../models/User");

const getAllUsers = async (req, res) => {
  const users = await UserModel.findUsers();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(users));
  res.end();
};

const addUser = async (req, res) => {
  try {
    let user = "";

    req.on("data", (data) => {
      user = user + data.toString();
    });

    req.on("end", async () => {
      const { name, userName, email } = JSON.parse(user);

      const isUserExists = UserModel.findUserByEmailOrUsername(email, userName);

      if (name == "" || userName == "" || email == "") {
        res.writeHead(422, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "User data are not valid" }));
        res.end();
        // } else if (isUserExists) {
        //   res.writeHead(409, { "Content-Type": "application/json" });
        //   res.write(
        //     JSON.stringify({ message: "email or username already is exist" })
        //   );
        //   res.end();
      } else {
        const newUser = {
          name,
          userName,
          email,
          crime: 0,
          role: "USER",
        };
        const registeredUser = await UserModel.registerUser(newUser);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(registeredUser));
        res.end();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  let user = "";

  req.on("data", (data) => {
    user = user + data;
  });

  req.on("end", async () => {
    const { email, userName } = JSON.parse(user);

    const mainUser = await UserModel.foundUser(email, userName);

    if (mainUser) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({ username: mainUser.userName, email: mainUser.email })
      );
      res.end();
    } else {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "User Not Found" }));
    }
    res.end();
  });
};

const upgradedUser = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const userID = parsedUrl.query.id;

  if (!userID) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User ID is required" }));
  }

  const result = await UserModel.upgradeUser(userID);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(result));
  res.end();
};

const crimedUser = async (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const userID = parseUrl.query.id;

  if (!userID) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User ID is required" }));
    return;
  }

  let reqBody = "";

  req.on("data", (data) => {
    reqBody = reqBody + data;
  });

  req.on("end", async () => {
    const { crime } = JSON.parse(reqBody);

    const result = await UserModel.crimeUser(userID, crime);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result));
    res.end();
  });
};


module.exports = {
  getAllUsers,
  addUser,
  loginUser,
  upgradedUser,
  crimedUser,
};
