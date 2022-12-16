import Puntaje from "../models/Puntaje.js";

const setPuntaje = async (req,res) => {

    try {
        const puntaje = new Puntaje(req.body);
        const puntajeguardado = await puntaje.save();
        res.json(puntajeguardado);
    } catch (error) {
        console.log(error.message);
    }
};

const getPuntajePerfil =async (req,res) => {
    try {
        const PuntajeP = await Puntaje.find({usuarioid:req.params.id})
        if(!PuntajeP){
         return res.sendStatus(404)
        } else {
         return res.json(PuntajeP);
        }
     } catch (error) {
         return res.status(500).json({ message: error.message });
     };    
}

const getPuntajesPeli = async (req,res) => {
    try {
        const PuntajeP = await Puntaje.find({peliculaid:req.params.id})
        if(!PuntajeP){
         return res.sendStatus(404)
        } else {
         return res.json(PuntajeP);
        }
     } catch (error) {
         return res.status(500).json({ message: error.message });
     };    
};

const updatePuntaje = async (req,res) => {
    const {id} = req.params;
    const puntaje = await Puntaje.findById(id);

    if(!puntaje) {
        return res.json(404).json({msg: "No encontrado"})
    };

    puntaje.puntuacion = req.body.puntuacion || puntaje.puntuacion;

    try {
        const PunjateActualizado = await Puntaje.save();
        res.json(PunjateActualizado)
    } catch (error) {
        console.log(error)
    };
};

const deletePuntaje = async (req,res) => {
    try {
        const puntajeRemoved = await Puntaje.findByIdAndDelete(req.params.id);
        res.send("Eliminado con exito")
    } catch (error) {
        console.log(error)
    }
};

export {
    setPuntaje,
    getPuntajesPeli,
    getPuntajePerfil,
    updatePuntaje,
    deletePuntaje
}