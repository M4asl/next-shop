import nc from "next-connect";
import connectDb from "../../../config/dbConnect";

import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../../controllers/productController";
import { protect } from "../../../middlewares/auth";

import onError from "../../../middlewares/dbErrorHandler";

const handler = nc({ onError });

connectDb();

handler.get(getProductById);

handler.put(updateProduct);

handler.delete(deleteProduct);

export default handler;
