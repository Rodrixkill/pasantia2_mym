import { Router } from 'express'
import { getEmpresas, createEmpresa, getEmpresa, deleteEmpresa, updateEmpresa } from '../controllers/empresa.controller'

const router = Router();

router.route('/')
    .get(getEmpresas)
    .post(createEmpresa);

router.route('/:id')
    .get(getEmpresa)
    .delete(deleteEmpresa)
    .put(updateEmpresa);

export default router;