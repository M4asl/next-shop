import nc from "next-connect";
import connectDb from "../../../../config/dbConnect";

import { protect } from "../../../../middlewares/auth";
import { updateOrderToPaid } from "../../../../controllers/orderController";

import onError from "../../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.use(protect).put(updateOrderToPaid);

export default handler;
