import nc from "next-connect";
import connectDb from "../../../config/dbConnect";

import { register } from "../../../controllers/authController";

import onError from "../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.post(register);

export default handler;
