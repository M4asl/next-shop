import nc from "next-connect";
import connectDb from "../../../config/dbConnect";

import { getTopProducts } from "../../../controllers/productController";

import onError from "../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.get(getTopProducts);

export default handler;
