import { Router } from 'express'
import { changePassword,forgotPassword } from '../controllers/resetCon.controller'

const router = Router();

router.route('/')
    .post(forgotPassword);
router.route('/change/:token')
    .post(changePassword);

export default router;