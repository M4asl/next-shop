import nc from "next-connect";
import connectDb from "../../../config/dbConnect";

import { getLastestProducts } from "../../../controllers/productController";

import onError from "../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.get(getLastestProducts);

export default handler;
