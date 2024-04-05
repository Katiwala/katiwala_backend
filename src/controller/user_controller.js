import user_model from "../models/user_model";
import HttpErrorCodes from "../../utils/HttpErrorCodes";
import HttpSuccessCodes from "../../utils/HttpSuccessCodes";
import bcrypt from "bcrypt";

export const user_add = async (request, response) => {
  const password = request.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //we need to check first if the user already exists using the phoneNumber
  const userExists = await user_model
    .findOne({ phoneNumber: request.body.phoneNumber })
    .exec();

  if (userExists) {
    return response.status(HttpErrorCodes.BadRequest).json({
      message: "User already exists please use a different phone number",
    });
  }

  try {
    const user = new user_model({
      ...request.body,
      password: hashedPassword,
    });

    //? This will store the data in the database MONGODB
    const user_get = await user.save();
    response.status(HttpSuccessCodes.Created).json(user_get);
  } catch (err) {
    response.status(HttpErrorCodes.InternalServerError).json(err);
  }
};

export const user_exists = async (request, response) => {
  const phoneNumber = request.params.phoneNumber;

  const userExists = await user_model.findOne({ phoneNumber }).exec();
  if (userExists) {
    return response.status(HttpSuccessCodes.OK).json({
      message: "User exists",
    });
  }
};

export const user_get = (request, response) => {};
export const user_update = (request, response) => {};
export const user_delete = (request, response) => {};
