import { Router } from 'express'
import { getUsuarioByEmpresa,newPassword,getUsuarios, createUsuario, getUsuario, deleteUsuario, updateUsuario } from '../controllers/usuario.controller'

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

router.route('/empresa/:empresa')
    .get(getUsuarioByEmpresa)
    
export default router;