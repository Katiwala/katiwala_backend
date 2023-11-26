import user_model from "../models/user_model";
import HttpErrorCodes from "../../utils/HttpErrorCodes";
import HttpSuccessCodes from "../../utils/HttpSuccessCodes";

export const user_add = async (request, response) => {
  try {
    const user = new user_model(request.body);
    const user_get = await user.save();
    response.status(HttpSuccessCodes.Created).json(user_get);
  } catch (err) {
    response
      .status(HttpErrorCodes.InternalServerError)
      .json({ message: err.message });
  }
};

export const user_get = (request, response) => {};
export const user_update = (request, response) => {};
export const user_delete = (request, response) => {};
