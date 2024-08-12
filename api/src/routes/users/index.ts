import { Router } from "express";
import { getUsers, createUser, getTypeUsers } from "../../controllers/users/usersController.js";

const router = Router();

router.get(`/`, getUsers);
router.get('/type', getTypeUsers);
router.post('/create', createUser);

export default router;