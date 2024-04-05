import jwt from "jsonwebtoken";
import user_model from "../models/user_model";
import bcrypt from "bcrypt";

export const loginController = async (request, response) => {
  const { phoneNumber, password } = request.body;

  //check if the user exists
  const userExists = await user_model.findOne({ phoneNumber }).exec();

  if (!userExists) {
    return response.status(400).json({ message: "User does not exist" });
  }

  //check if the password is correct
  const validPassword = await bcrypt.compare(password, userExists.password);
  if (!validPassword) {
    return response.status(400).json({ message: "Password is incorrect" });
  }

  //create and assign a token
  const accessToken = jwt.sign(
    { _id: userExists._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      //expires in 15mins
      expiresIn: "15m",
    }
  );

  //update the user with the token
  userExists.jwtToken = accessToken;
  await userExists.save();

  response.status(200).json(accessToken);
};
