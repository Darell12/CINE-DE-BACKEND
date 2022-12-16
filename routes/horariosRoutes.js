import express from 'express';
import {
    getHorario,
    getHorarios,
    createHorario,
    updateHorario,
    deleteHorario,
    getHorariosSelecion
} from '../controllers/horarioController.js'

const router = express.Router();

router.post('/create', createHorario);
router.get('/get', getHorarios);
router.get('/get/:id', getHorario);
router.get('/getselect/:id', getHorariosSelecion);
router.put('/update/:id', updateHorario);
router.delete('/delete/:id', deleteHorario);

export default router;