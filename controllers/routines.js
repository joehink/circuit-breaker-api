const express = require('express');
const passport = require('passport');
const passportService = require('../services/passport');
const router = express.Router();
const Routine = require('../models/routines.js');

const requireAuth = passport.authenticate('jwt', { session: false });

// Create Routine
router.post('/', requireAuth, async (req, res) => {
  // append curret user to req.body
  req.body.createdBy = req.user;
  // Add routine to the database
  const newRoutine = await Routine.create(req.body);
  // send back the created routine
  res.status(200).json(newRoutine);
});

// Get all routines created by user
router.get('/', requireAuth, async (req, res) => {
  // find all routines created by currentUser
  const routines = await Routine.find({
    createdBy: req.user._id
  });
  // send response with all routines createdBy currentUser
  res.status(200).json(routines);
})

// Get one routine
router.get('/:routineId', requireAuth, async (req, res) => {
  // Query to find routine in db
  const routine = await Routine.findOne({
    _id: req.params.routineId
  });

  // if there is no routine with that id
  if (!routine) {
    // send back 404
    res.status(404).json({
      message: "This routine no longer exists"
    });
  } else if (routine.createdBy == req.session.currentUser._id) {
    // if routine.createdBy equals currentUser id
    // send back routine
    res.status(200).json(routine);
  } else {
    // routine.createdBy does not equal currentUser id
    // routine does not belong to user
    res.status(401).json({
      message: "This routine does not belong to you"
    })
  }
})


// Delete Routine
router.delete('/:routineId', requireAuth, async (req, res) => {
  await Routine.findByIdAndRemove(req.params.routineId);
  res.json({ deleted: true })
})

// Update Routine
router.put('/:routineId', requireAuth, async (req, res) => {
  await Routine.findByIdAndUpdate(req.params.routineId, req.body);
  res.json({ updated: true })
})

module.exports = router;
