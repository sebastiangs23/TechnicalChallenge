import { Router } from "express";
import { getUsers, createUser, getTypeUsers } from "../../controllers/users/usersController.js";

const router = Router();

router.get(`/`, getUsers);
router.post('/', createUser);
router.get('/type', getTypeUsers);

export default router;