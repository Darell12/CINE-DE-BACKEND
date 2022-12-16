import mongoose from "mongoose";

const HorarioSchema = mongoose.Schema({
      startAt: {
        type: String,
        required: false,
        trim: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      peliculaid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'peliculas',
        required: true,
      },
      asientosDisponibles: {
        type: Number,
        required: true,
      }
      // cinemaId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'Cinema',
      //   required: true,
      // },
    }
);

const Horario = mongoose.model('Horario', HorarioSchema);
export default Horario;