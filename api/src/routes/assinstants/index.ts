import { Router } from "express";
import { getAssistantsUser, createAssistant } from "../../controllers/assistants/assistantsController.js";

const router = Router();

router.get("/:id_user", getAssistantsUser);
router.post("/", createAssistant);

export default router;