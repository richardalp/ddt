import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Machine } from './models/Machine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Get all machines
app.get('/api/machines', async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new machine
app.post('/api/machines', async (req, res) => {
  const machine = new Machine(req.body);
  try {
    const newMachine = await machine.save();
    res.status(201).json(newMachine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a machine
app.put('/api/machines/:id', async (req, res) => {
  try {
    const updatedMachine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMachine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a machine
app.delete('/api/machines/:id', async (req, res) => {
  try {
    await Machine.findByIdAndDelete(req.params.id);
    res.json({ message: 'Machine deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});