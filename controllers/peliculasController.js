import Pelicula from '../models/Peliculas.js';
import fs from 'fs-extra'
import {
        uploadImage,
        deleteImage
} from '../helper/cloudinary.js'



const prueba = (req, res) => {
    res.send({
        msg : "En esta ruta gestionaremos todas la peticiones correspondiente al modelo de peliculas"
    })
};

const createPeliculas = async (req, res) => {
try {
    const { titulo, genero, director, duracion, sinopsis } = req.body;
    let image;
    if (req.files!==null){
    if (req.files.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        image={
          url: result.secure_url,
          public_id: result.public_id,
        };
        console.log(result)
      }
    }else {
        image = {
            url: "https://res.cloudinary.com/dgi1aoxog/image/upload/v1668981098/productos/productoblacoynegro_ty6jw2.jpg",
            public_id: "productos/productoblacoynegro_ty6jw2",
        };
    }
    const NewPelicula = new Pelicula({  titulo, genero, director, image, duracion, sinopsis });
    await NewPelicula.save();
    return res.json(NewPelicula);
} catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });}
};

const getPeliculas = async (req, res) => {
    try {
        const Peliculas = await Pelicula.find();
        res.send(Peliculas);
        } catch (error) {       
            console.log(error.message);
            return res.status(500).json({ message: error.message });}
        };
        


const updatePeliculas = async (req, res) =>{
        try {
         const updatedmovie = await Pelicula.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
            }
        );
            return res.send(updatedmovie);

        } catch (error) {
            return res.status(500).json({ message: error.message });}
        };


const deletePeliculas = async (req, res) =>{
    try {
        const movieRemoved = await Pelicula.findByIdAndDelete(req.params.id);
        
        if (!movieRemoved) {
            const error = new Error("Token no valido");
            return res.sendStatus(404);
        } else {
             if (movieRemoved.image.public_id) {
             await deleteImage(movieRemoved.image.public_id);}
            return res.sendStatus(204);
            }
        } catch (error) {
        return res.status(500).json({ message: error.message });}
}

const getPelicula = async (req, res) =>{

    const id = req.params;
    try {
        const Onemovie = await Pelicula.findById(req.params.id);
        if (!Onemovie) {
        return res.sendStatus(404);
    } else {
        return res.json(Onemovie);
    }
        } catch (error) {
        return res.status(500).json({ message: error.message });}
}

export {
    prueba,
    createPeliculas,
    getPelicula,
    getPeliculas,
    deletePeliculas,
    updatePeliculas
};