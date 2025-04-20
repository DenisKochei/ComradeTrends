import User from "../models/user.model.js";
import UserVerificaion from "../models/UserVerification.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.PASSWORD,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("nodemailer activated");
  }
});

const sendVerificationEmail = async ({ _id, email }, res) => {
  try {
    const currentUrl = "https://comradetrends.com/api/auth";
    const uniqueString = uuidv4() + _id;
    const mailOptions = {
      from: process.env.AUTH_MAIL,
      to: email,
      subject: "Verify email",
      html: `<p>Verify your email to finish setting up your account</p><p>Click <a href=${
        currentUrl + "/verify/" + _id + "/" + uniqueString
      }>Here</a> to verify</p><p>Welcome to comrade Trends</p><p>A bustling hub of breaking news, Kenya's and the globe's heartbeat echoing across the digital savanna.</p>`,
    };

    const hashedString = bcryptjs.hashSync(uniqueString, 10);
    const newVerification = new UserVerificaion({
      userId: _id,
      uniquestring: hashedString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
    });
    await newVerification.save();
    transporter.sendMail(mailOptions).then(console.log("email sent"));
  } catch (err) {
    console.log(err.message);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { userId, uniqueStringSent } = req.params;
  const validString = await UserVerificaion.findOne({ userId });
  if (!validString) {
    return next(
      errorHandler(
        404,
        "Verification Code is invalid or the user already exists "
      )
    );
  }
  const { expiresAt } = validString._doc;
  const { uniquestring } = validString._doc;
  if (expiresAt < Date.now()) {
    await UserVerificaion.deleteOne({ userId });
    await User.deleteOne({ _id: userId });
    res.status(404).json({
      status:"The link has expired. please signup again"
    })
  }
  const comparison = bcryptjs.compareSync(uniqueStringSent, uniquestring);
  if (comparison) {
    await UserVerificaion.deleteOne({ userId });
    const validUser = await User.updateOne({ _id: userId }, { verified: true });
    return res.redirect("/sign-in");
  } else {
    return next(errorHandler(500, "Internal server Error try again later"));
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  //The "10" is the the salt rounds. It represents the number of times bcrypt stirs the cauldron (i.e., the number of hashing rounds).

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    verified: false,
  });

  try {
    await newUser.save().then((result) => {
      sendVerificationEmail(result);
    });
    res.json({ message: "Signup Successful" });
  } catch (err) {
    if (err.message.includes("email_1 dup key")) {
      next(errorHandler(400, "The email is already in use"));
    }
    next(errorHandler(400, "Network interuption,please try again"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found, please signup"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    //password is what we get from the form while validuser.passowrd is what database
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password or email"));
    }
    //When comparing both the email and the password it is best to make the message not clear by saying that either or both the email or the password is incorrect
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "10y" },
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      })
      .json(rest);
  } catch (err) {
    if (err.message.includes("buffering")) {
      next(errorHandler(400, "network interuption,please try again"));
    } else {
      next(errorHandler(400, "Network interuption,please try again"));
    }
  }
};
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "10y" } // JWT expiration (not the cookie expiration)
      );

      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years in milliseconds
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1y" }
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
