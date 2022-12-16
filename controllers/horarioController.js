import Horario from "../models/Horario.js";

const createHorario = async (req,res) => {

    try {
        const {startAt, startDate, endDate, peliculaid} = req.body;
        const NewHorario = new Horario({startAt, startDate, endDate, peliculaid})
        const horarioGuardado = await NewHorario.save();
       res.status(201).send(horarioGuardado);
       console.log("Creó")
    } catch (error) {
        res.status(400).send(error)
    }
};

const getHorarios = async (req,res) => {
    try {
        const horarios = await Horario.find({});
        res.send(horarios);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getHorariosSelecion = async (req,res) => {
    try {
        const horarios = await Horario.findById(req.params.id);
        res.send(horarios);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getHorario = async (req, res) => {

    try {
        const horario = await Horario.find({peliculaid : req.params.id});
        if (!horario) {
            return res.status(404);
        } else {
            return res.json(horario);
        }  
    } catch (error) {
        res.status(404).send(error);
    }
};

const updateHorario = async (req,res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['startAt', 'startDate', 'endDate', 'peliculaid'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  
    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });
  
    try {
      const horario = await Horario.findById(_id);
      updates.forEach((update) => (horario[update] = req.body[update]));
      await horario.save();
      return !horario ? res.sendStatus(404) : res.send(horario);
    } catch (e) {
      return res.status(400).send(e);
    }
};

const deleteHorario = async (req,res) => {
    const _id = req.params.id;
    try {
      const horario = await Horario.findByIdAndDelete(_id);
      return !showtime ? res.sendStatus(404) : res.send(horario);
    } catch (e) {
      return res.sendStatus(400);
    }
};

export {
    createHorario,
    getHorario,
    getHorarios,
    updateHorario,
    deleteHorario,
    getHorariosSelecion
}