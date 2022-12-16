import express from "express";
import {
    setPuntaje,
    getPuntajePerfil,
    getPuntajesPeli,
    updatePuntaje,
    deletePuntaje
} from '../controllers/puntajeController.js';

const router = express.Router();

//Rutas de Gestion
router.post('/set', setPuntaje);
router.get('/getpuntaje/perfil/:id', getPuntajePerfil);
router.get('/getpuntaje/pelicula/:id', getPuntajesPeli);
router.put('/update/:id', updatePuntaje);
router.delete('/delete/:id', deletePuntaje);

export default router;