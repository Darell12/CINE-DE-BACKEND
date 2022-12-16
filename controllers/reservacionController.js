import Reservacion from '../models/Reservacion.js'


const createReservacion = async (req,res) => {
    const reservacion = new Reservacion(req.body);

    /// const QRCode = await gnerateQR(URL HEROKU)

    try {
        await reservacion.save();
        res.status(201).send(reservacion)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getReservaciones = async (req, res) => {
    try {
        const reservaciones = await Reservacion.find({})
        res.send(reservaciones);
    } catch (error) {
        res.status(400).send(error);
    }
}

const getReservacionId = async  (req, res) => {
    const {id} = req.params.id;

    try {
        const reservacion = await Reservacion.findById(id);
        return !reservacion ? res.sendStatus(404) : res.send(reservacion);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const getReservacionCheck = async (req, res) => {
    const {id} = req.params.id;
    try {
      const reservacion = await Reservacion.findById(id);
      reservacion.checkin = true;
      await reservacion.save();
      return !reservacion ? res.sendStatus(404) : res.send(reservacion);
    } catch (e) {
      res.status(400).send(e);
    }
};

const updateReservacin = async (req,res) => {
    const {id} = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'fecha',
        'inicia',
        'asientos',
        'ticketPrice',
        'total',
        'usuario',
        'telefono',
        'checkin',
      ];
    
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

      if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

      try {
        const reservacion = await Reservacion.findById(_id);
        updates.forEach((update) => (reservacion[update] = req.body[update]));
        await reservacion.save();
        return !reservacion ? res.sendStatus(404) : res.send(reservacion);
      } catch (e) {
        return res.status(400).send(e);
      }
}

const deleteReservacion = async (req,res) =>{
    const {id} = req.params.id;
    try {
      const reservacion = await Reservacion.findByIdAndDelete(id);
      return !reservacion ? res.sendStatus(404) : res.send(reservacion);
    } catch (e) {
      return res.sendStatus(400);
    }
};




export {
  createReservacion,
  getReservacionCheck,
  getReservacionId,
  getReservaciones,
  updateReservacin,
  deleteReservacion
}