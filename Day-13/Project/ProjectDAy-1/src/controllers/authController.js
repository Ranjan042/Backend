const UserModel = require("../Models/UserModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  try {
    const { email, username, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await UserModel.findOne({
      $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message:
          "User already exists " +
          (isUserAlreadyExists.email === email
            ? "Email Already Exists"
            : "UserName Already Exists")
      });
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const User = await UserModel.create({
      username,
      email,
      bio,
      profileImage,
      password: hash
    });

    const token = jwt.sign(
      { id: User._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "User Registered Successfully",
      user: {
        email: User.email,
        username: User.username,
        bio: User.bio,
        profileImage: User.profileImage
      },
      token
    });
  } catch (err) {
    console.log("Register Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginController(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await UserModel.findOne({
      $or: [{ username }, { email }]
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const isPasswordValid = hash === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Password Invalid"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "User LoggedIn Successfully",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage
      }
    });
  } catch (err) {
    console.log("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { registerController, loginController };
