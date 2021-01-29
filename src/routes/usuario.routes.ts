import { Router } from 'express'
import { newPassword,getUsuarios, createUsuario, getUsuario, deleteUsuario, updateUsuario } from '../controllers/usuario.controller'

const router = Router();

router.route('/')
    .get(getUsuarios)
    .post(createUsuario);

router.route('/:id')
    .get(getUsuario)
    .delete(deleteUsuario)
    .put(updateUsuario);

router.route('/pwd')
    .put(newPassword);
    
export default router;