import express from 'express';
import {
getReservacionCheck,
getReservacionId,
getReservaciones,
createReservacion,
updateReservacin,
deleteReservacion
} from '../controllers/reservacionController.js'

const router = express.Router();

//Rutas Publicas
router.post('/', createReservacion);
router.get('/confirmar/:id', getReservacionCheck);
router.get('/reservaciones', getReservaciones);
router.get('/reservacion/:id', getReservacionId);
router.put('/update/:id', updateReservacin);
router.delete('/delete/:id', deleteReservacion);

export default router;