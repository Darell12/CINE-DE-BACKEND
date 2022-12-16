import Comentario from "../models/Comentarios.js";

const createComentario = async (req,res) =>{
    try{
    const comentario = new Comentario(req.body);
    const comentraioGuardado = await comentario.save();
    res.json(comentraioGuardado);
    } catch(error){
        console.log(error.message);
    }
};

const getComentario = async (req, res) => {
    try {
       const OneComent = await Comentario.findById(req.params.id)
       if(!OneComent){
        return res.sendStatus(404)
       } else {
        return res.json(OneComent);
       }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
};

const getComentariosPeli = async (req, res) => {
    try {
       const OneComent = await Comentario.find({peliculaid:req.params.id})
       if(!OneComent){
        return res.sendStatus(404)
       } else {
        return res.json(OneComent);
       }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    };
};

const getComentarios = async (req,res) => {
    try {
        const comentrarios = await Comentario.find();
        res.send(comentrarios);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message});
    }
}

const updateComentario = async (req, res) => {
    
        const {id} = req.params;
        const comentario = await Comentario.findById(id);

        if (!comentario) {
            return res.status(404).json({msg: "No encontrado"})
        }  
        
        comentario.comentario = req.body.comentario || comentario.comentario;

        try {
            const ComentarioActualizado = await comentario.save()
            res.json(ComentarioActualizado)
        } catch (error) {
            console.log(error)
        }
    };

const deleteComentario = async (req,res) => {
    try {
        const ComentarioRemoved = await Comentario.findByIdAndDelete(req.params.id)
        res.send("Elimindao con Exito")
    } catch (error) {
        console.log(error)
    }
}

export {
    createComentario,
    getComentario,
    getComentarios,
    updateComentario,
    getComentariosPeli,
    deleteComentario
};
