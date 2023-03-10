import mongoose, { mongo } from "mongoose";

const cinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      ticketPrice: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      seats: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
      },
      seatsAvailable: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
      },
})

const Cinema = mongoose.model('Cinema', cinemaSchema);
export default Cinema;