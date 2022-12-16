import mongoose from 'mongoose';

const reservacionSchema = new mongoose.Schema({
  fecha: {
    type: String,
    required: true,
  },
  // inicia: {
  //   type: String,
  //   required: true,
  //   trim: true,  
  // },
  asientos: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  ticketPrice: {
    type: String,
    // required: true,
  },
  total: {
    type: String,
    required: true,
  },
  // cinemaId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Cinema',
  //   required: true,
  // },
  peliculaid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "peliculas",
    required: true,
  },
  nombrePelicula:{
    type: String,
    required: true
  },
  usuarioid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usuarios",
    required: true
  },
  usuario: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  checkin: {
    type: Boolean,
    default: false,
  }
});

const Reservacion = mongoose.model('Reservacion', reservacionSchema);

export default Reservacion;