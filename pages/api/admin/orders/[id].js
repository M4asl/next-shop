import nc from "next-connect";
import connectDb from "../../../../config/dbConnect";

import onError from "../../../../middlewares/dbErrorHandler";
import { protect } from "../../../../middlewares/auth";
import { authorizeRoles } from "../../../../controllers/authController";
import {
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../../../../controllers/orderController";

const handler = nc({ onError });

connectDb();

handler.use(protect).use(authorizeRoles("admin")).get(getOrderById);
handler.use(protect).use(authorizeRoles("admin")).put(updateOrderStatus);
handler.use(protect).use(authorizeRoles("admin")).delete(deleteOrder);

export default handler;
