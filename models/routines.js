const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: { type: String, required: true },
  images: { 
    still: {
      sm: {type: String, required: true},
      med: {type: String, required: true},
      lrg: {type: String, required: true}
    },
    animated: {
      sm: {type: String, required: true},
      med: {type: String, required: true},
      lrg: {type: String, required: true}
    }
  },
  duration: { type: Number, required: true, default: 30 }
})

const routineSchema = new Schema({
    name: { type: String, required: true },
    exercises: [exerciseSchema],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
