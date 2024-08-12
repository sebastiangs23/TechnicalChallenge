import { Router } from "express";
import userRoutes from "./users/index.js";

const router = Router();

/*__________
|  USERS  */
router.use('/users', userRoutes);   

/*_____________
|  CHAT-GPT  */

export default router;