import mongoose from "mongoose";

const puntajeSchema = mongoose.Schema(
    {
        usuarioid: {
            type: mongoose.Schema.Types.ObjectId,ref: "usuario",
            required: true
        },
        peliculaid: {
            type: mongoose.Schema.Types.ObjectId,ref: "peliculas",
            required: true
        },
        puntuacion: {
            type: Number,
            required: true,
            
        }
    },
        {
            timestamps: true,
        }
)

const Puntaje = mongoose.model('Puntaje', puntajeSchema);
export default Puntaje;