import { Router } from 'express'
import { changePassword,forgotPassword, sendMail } from '../controllers/resetCon.controller'

const router = Router();

router.route('/')
    .post(forgotPassword);
router.route('/change/:token')
    .post(changePassword);
router.route('/sendMail')
    .post(sendMail);

export default router;