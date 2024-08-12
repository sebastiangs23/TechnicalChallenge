import { Router } from "express";
import { getUsers, createUser, getTypeUsers } from "../../controllers/users/usersController.js";

const router = Router();

router.get(`/`, getUsers);
router.get('/type', getTypeUsers);
router.post('/', createUser);

export default router;