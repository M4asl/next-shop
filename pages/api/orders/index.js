import nc from "next-connect";
import connectDb from "../../../config/dbConnect";

import { protect } from "../../../middlewares/auth";
import { addOrderItems } from "../../../controllers/orderController";

import onError from "../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.use(protect).post(addOrderItems);

export default handler;
