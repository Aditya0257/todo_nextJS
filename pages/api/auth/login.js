const { asyncError, errorHandler } = require("@/middlewares/error");
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import { User } from "../../../models/user";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");
  console.log(req.body);

  let { email, password } = req.body;

  if (!email || !password)
    return errorHandler(res, 400, "Please enter all fields!");

  await connectDB();
  const user = await User.findOne({ email }).select("+password");

  if (!user) return errorHandler(res, 400, "Invalid Email or Password");
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return errorHandler(res, 400, "Invalid Email or Password");

  const authToken = generateToken(user._id);

  cookieSetter(res, authToken, true);

  res.status(200).json({  // here .json() -> static method of the Response interface to create Response objects for returning JSON encoded data
    success: true,
    message: `Welcome back, ${user.name}`,
    user,
  });
});

export default handler;
