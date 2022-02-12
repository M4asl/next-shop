import nc from "next-connect";
import connectDb from "../../../config/dbConnect";

import { protect } from "../../../middlewares/auth";
import { getOrderById } from "../../../controllers/orderController";

import onError from "../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.use(protect).get(getOrderById);

export default handler;
