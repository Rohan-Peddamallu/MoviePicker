import express from 'express';
import { signup, login} from '../controllers/users';
import validateRequestSchema from '../middlewares/validateRequest';
import { signupSchema } from '../validation/users';
import { getAuthenticatedUser } from '../controllers/users';

const router = express.Router();

router.post('/signup', validateRequestSchema(signupSchema), signup);
router.post('/login', login);

router.get("/authenticated-user", getAuthenticatedUser);

export default router;