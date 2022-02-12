import nc from "next-connect";
import connectDb from "../../../config/dbConnect";

import { getProducts } from "../../../controllers/productController";

import onError from "../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.get(getProducts);

export default handler;
