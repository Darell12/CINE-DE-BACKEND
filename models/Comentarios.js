import mongoose from 'mongoose';

const comentarioSchema = mongoose.Schema(
{
    usuarioid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuario",
        required: true
    },
    peliculaid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "peliculas",
        required: true
    },
    comentario: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    }
);

const Comentario = mongoose.model('Comentario', comentarioSchema);
export default Comentario;