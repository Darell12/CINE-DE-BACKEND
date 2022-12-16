import express from 'express';
import {
    getCinema,
    getCinemas,
    createCinema,
    updateCinema,
    deleteCinema
} from '../controllers/cinemaController.js';

const router = express.Router();

//Rutas de gestion
router.post('/', createCinema);
router.get('/get', getCinemas);
router.get('/get/:id', getCinema);
router.put('/put/:id', updateCinema);
router.delete('/delete/:id', deleteCinema);

export default router;