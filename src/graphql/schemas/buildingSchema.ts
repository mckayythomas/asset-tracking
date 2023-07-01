import mongoose, { Schema } from 'mongoose';

const BuildingSchema: Schema = new Schema({
  buildingId: { type: String, required: true },
  locationId: { type: String, required: true },
  name: { type: String, required: true },
  floors: { type: Number, required: true },
  departments: [
    {
      name: { type: String, required: true },
    },
  ],
});

const Building = mongoose.model('Building', BuildingSchema);

export default Building;