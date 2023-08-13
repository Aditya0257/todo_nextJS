import mongoose from "mongoose";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const cookieSetter = (res, authToken, set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", set ? authToken : "", {
      path: "/", // Setting the path of a cookie to '/' has the effect of making the cookie accessible to all URLs within the domain.
      // This means that the cookie will be sent by the browser to the server for every request made to any path under that domain. The path essentially defines the scope of URLs for which the cookie is valid and should be included in the request headers.
      httpOnly: true, // the cookie can only be accessed by the server and is not accessible to JavaScript running in the browser. This helps prevent cross-site scripting (XSS) attacks, where an attacker tries to steal sensitive information from users.
      maxAge: set
        ? 15 * 24 * 60 * 60 * 1000 // 15 days
        : 0,
    })
  );
};

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

export const checkAuth = async (req) => {
  // console.log(req.headers.cookie); // suppose -> cookie : auth_token = sfsrfedrsgferdr
  // so in console we get -> auth_token = sfsrfedrsgferdr

  // console.log("-----------break line--------");

  // console.log(req.headers.cookie.split("=")); // now we split it at '=' in 2 elements of array
  // now we get -> ['auth_token', 'sfsrfedrsgferdr']

  // console.log("-----------break line--------");

  const cookie = req.headers.cookie;

  if (!cookie) return null;
  const token = cookie.split("=")[1];

  const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log("decodedUserData is : ", decodedUserData); // something like this -> { _id: '64d5375dda54cc5a93f6d740', iat: 1691696992 }

  return await User.findById(decodedUserData._id);
};
