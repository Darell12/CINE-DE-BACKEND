import Cinema from '../models/Cinema.js';
import fs from 'fs-extra';
import {
    uploadImage,
    deleteImage
} from '../helper/cloudinary.js';

const createCinema = async (req, res) =>{
    const cinema = new Cinema(req.body);
    try {
      await cinema.save();
      res.status(201).send(cinema);
    } catch (e) {
      res.status(400).send(e);
    }
};

const getCinemas = async (req,res) => {
    try {
        const cinemas = await Cinema.find({});
        res.send(cinemas);
      } catch (e) {
        res.status(400).send(e);
      }
};

const getCinema = async (req, res) => {
    const _id = req.params.id;
    try {
      const cinema = await Cinema.findById(_id);
      if (!cinema) return res.sendStatus(404);
      return res.send(cinema);
    } catch (e) {
      return res.status(400).send(e);
    }
}

const updateCinema = async (req,res) => {
    const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'ticketPrice', 'city', 'seats', 'seatsAvailable'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    const cinema = await Cinema.findById(_id);
    updates.forEach((update) => (cinema[update] = req.body[update]));
    await cinema.save();
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.status(400).send(e);
  }  
};

const deleteCinema = async (req,res) => {
    const _id = req.params.id;
    try {
      const cinema = await Cinema.findByIdAndDelete(_id);
      if (!cinema) return res.sendStatus(404);
      return res.send(cinema);
    } catch (e) {
      return res.sendStatus(400);
    }
};

export {
    createCinema,
    getCinema,
    getCinemas,
    updateCinema,
    deleteCinema
}