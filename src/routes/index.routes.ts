import { Router } from 'express'
import { indexWelcome } from '../controllers/index.controller'

const router = Router();

router.route('/')
    .post(indexWelcome);

export default router;