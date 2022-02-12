import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.setHeader(
    "Set-Cookie",
    serialize("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 3 * 24 * 60 * 60,
    })
  );

  user.password = undefined;

  const { _id, name, email, created, role } = user;

  res.setHeader(
    "Set-Cookie",
    serialize("role", role, {
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 3 * 24 * 60 * 60,
    })
  );

  res.status(statusCode).json({
    _id,
    name,
    email,
    created,
    role,
    token,
  });
};

export { createSendToken };
