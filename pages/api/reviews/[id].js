import nc from "next-connect";
import connectDb from "../../../config/dbConnect";

import { createProductReview } from "../../../controllers/productController";
import { protect } from "../../../middlewares/auth";

import onError from "../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.use(protect).put(createProductReview);

export default handler;
