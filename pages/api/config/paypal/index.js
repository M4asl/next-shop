import nc from "next-connect";
import connectDb from "../../../../config/dbConnect";

import { protect } from "../../../../middlewares/auth";
import { getConfigPaypal } from "../../../../controllers/orderController";

import onError from "../../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.use(protect).get(getConfigPaypal);

export default handler;
