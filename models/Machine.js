import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  date: String,
  text: String,
  parts: [String]
});

const machineSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  trackerSerialNumber: { type: String, required: true },
  projectStock: {
    type: { type: String, enum: ['Project', 'Stock'], required: true },
    project: String,
    location: { type: String, enum: ['Enschede', 'Houston', 'Macaé'] }
  },
  version: { type: String, required: true },
  status: { type: String, required: true },
  notes: [noteSchema],
  dateLeft: String,
  dateReturn: String
});

export const Machine = mongoose.model('Machine', machineSchema);