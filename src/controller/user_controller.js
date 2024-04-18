import user_model from "../models/user_model";
import HttpErrorCodes from "../../utils/HttpErrorCodes";
import HttpSuccessCodes from "../../utils/HttpSuccessCodes";
import bcrypt from "bcrypt";
import { uploadImage } from "../service/UploadImages";

export const user_add = async (request, response) => {
  const { password, phoneNumber, documents, uploadedSkills, faceImage } =
    request.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //we need to check first if the user already exists using the phoneNumber
  const userExists = await user_model
    .findOne({ phoneNumber: phoneNumber })
    .exec();

  if (userExists) {
    return response.status(HttpErrorCodes.BadRequest).json({
      message: "User already exists please use a different phone number",
    });
  }

  try {
    console.log(documents);
  } catch (error) {
    response.status(HttpErrorCodes.InternalServerError).json(error);
  }

  try {
    const user = new user_model({ ...request.body, password: hashedPassword });
    // const user_get = await user.save();
    response.status(200).json(`User added successfully`);
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate key error (unique constraint violation)
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];
      response.status(HttpErrorCodes.Conflict).json({
        error: `${field} "${value}" already exists. Please provide a unique value.`,
      });
    } else {
      // Handle other errors
      response.status(HttpErrorCodes.InternalServerError).json(err);
    }
  }
};

export const user_exists = async (request, response) => {
  const phoneNumber = request.params.phoneNumber;

  const userExists = await user_model.findOne({ phoneNumber }).exec();
  if (userExists) {
    return response.status(HttpSuccessCodes.OK).json({
      message: "User already exists please use a different phone number",
    });
  }
};

export const user_get = (request, response) => {};
export const user_update = (request, response) => {};
export const user_delete = (request, response) => {};
