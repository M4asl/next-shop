import nc from "next-connect";
import connectDb from "../../../../config/dbConnect";

import onError from "../../../../middlewares/dbErrorHandler";
import { protect } from "../../../../middlewares/auth";
import { authorizeRoles } from "../../../../controllers/authController";
import { createProduct } from "../../../../controllers/productController";

const handler = nc({ onError });

connectDb();

handler.use(protect).use(authorizeRoles("admin")).post(createProduct);

export default handler;
