import { Router } from "express";
import { getAssistantsUser, createAssistant, askAssistant } from "../../controllers/assistants/assistantsController.js";

const router = Router();

router.get("/:id_user", getAssistantsUser);
router.post("/", createAssistant);
router.post('/chat', askAssistant);

export default router;