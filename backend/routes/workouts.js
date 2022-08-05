const express = require('express')
const WorkOut = require('../models/workoutModel')
const router = express.Router()
const mongoose = require('mongoose')

// GET all workouts
router.get('/', async(req, res) => {
    const workouts = await WorkOut.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
})

// GET a single workout
router.get('/:id', async(req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:'No such workout'})

  const workout = await WorkOut.findById(id)

  if (!workout) return res.status(404).json({error:'No such workout'})

  res.status(200).json(workout)
})

// POST a new workout
router.post('/', async(req, res) => {
  const {title,reps,load} = req.body;
  try {
    const workout = await WorkOut.create({title,reps,load})
    res.status(201).json(workout)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
})

// DELETE a workout
router.delete('/:id', async(req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:'No such workout'})

  const workout = await WorkOut.findByIdAndDelete({_id:id})

  if (!workout) return res.status(404).json({error:'No such workout'})

  res.status(202).json(workout)
})

// UPDATE a workout
router.patch('/:id', async(req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:'No such workout'})

  const workout = await WorkOut.findByIdAndUpdate({_id:id},{...req.body})

  if (!workout) return res.status(404).json({error:'No such workout'})

  res.status(202).json(workout)
})

module.exports = router 