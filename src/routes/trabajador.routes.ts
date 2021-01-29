import { Router } from 'express'
import { getTrabajadorByEmpresa,getTrabajadorByGestion,getTrabajadores, createTrabajador, getTrabajador, deleteTrabajador, updateTrabajador } from '../controllers/trabajador.controller'

const router = Router();

router.route('/')
    .get(getTrabajadores)
    .post(createTrabajador);

router.route('/:id')
    .get(getTrabajador)
    .delete(deleteTrabajador)
    .put(updateTrabajador);

router.route('/empresa/:empresa')
    .delete(getTrabajadorByEmpresa)

router.route('/empresa/:empresa/gestion/:gestion')
    .delete(getTrabajadorByEmpresa)


export default router;