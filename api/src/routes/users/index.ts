import { Router } from "express";
import { getUsers, createUser } from "../../controllers/users/usersController.js";

const router = Router();

router.get(`/`, getUsers);
router.post('/create', createUser);

export default router;