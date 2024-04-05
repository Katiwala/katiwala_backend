import jwt from "jsonwebtoken";
import HttpErrorCode from "../../utils/HttpErrorCodes";

export const authenticateToken = (request, response, next) => {
  const authHeader = request.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return response.sendStatus(HttpErrorCode.Unauthorized);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return response.sendStatus(HttpErrorCode.Forbidden);
    request.user = user;
    next();
  });
};
