import express from 'express';
import {
    prueba,
    deletePeliculas,
    getPelicula,
    getPeliculas,
    createPeliculas,
    updatePeliculas
} from '../controllers/peliculasController.js';

const router = express.Router();

// Rutas Publicas

router.get('/prueba', prueba);
// Rutas Gestión Pelicula
router.get('/get', getPeliculas);
router.get('/get/:id', getPelicula);
router.post('/create', createPeliculas);
router.put('/update/:id', updatePeliculas);
router.delete('/delete/:id', deletePeliculas);
export default router;