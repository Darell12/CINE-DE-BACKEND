import mongoose from 'mongoose';

const peliculasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    genero: {
        type: String,
        required: true,
        trim: true,
    },
    director: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        url: String,
        public_id: String,
    },
    duracion: {
        type: String,
        required: true,
        trim: true,
    },
    sinopsis: {
        type: String,
        required: true,
        trim: true,
    }
});

const Pelicula = mongoose.model('Pelicula', peliculasSchema);
export default Pelicula;