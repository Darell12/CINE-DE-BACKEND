import express from "express";
import {
    createComentario,
    getComentario,
    getComentarios,
    getComentariosPeli,
    updateComentario,
    deleteComentario

} from '../controllers/comentarioController.js'

const router = express.Router();

//rutas de gestios
router.post('/create', createComentario);
router.get('/get', getComentarios);
router.get('/get/:id', getComentario);
router.put('/update/:id', updateComentario);
router.get('/gets/:id', getComentariosPeli);
router.delete('/delete/:id', deleteComentario);

export default router;