import { Router } from "express";
import userRoutes from "./users/index.js";
import assisntanceRoutes from "./assinstants/index.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, "../../iassistant_doc_swagger.yaml"));

const router = Router();

/*__________
|  USERS  */
router.use('/users', userRoutes);

/*_____________
|  CHAT-GPT  */
router.use('/assistants', assisntanceRoutes);

/*_________________
|  DOCUMENTATION  */
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;