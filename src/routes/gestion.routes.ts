import { Router } from 'express'
import { getGestion,getGestiones,createGestion,deleteGestion,updateGestion  } from '../controllers/gestion.controller'

const router = Router();

router.route('/')
    .get(getGestiones)
    .delete(deleteGestion)
    .put(updateGestion)
    .post(createGestion);

router.route('/single')
    .get(getGestion)
    

export default router;