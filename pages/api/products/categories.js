import nc from "next-connect";
import connectDb from "../../../config/dbConnect";

import { listCategories } from "../../../controllers/productController";

import onError from "../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.get(listCategories);

export default handler;
