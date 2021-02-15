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
    .get(getTrabajadorByEmpresa)

router.route('/empresa/:empresa/gestion/:gestion')
    .get(getTrabajadorByEmpresa)


export default router;