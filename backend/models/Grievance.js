const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  department: { type: String, required: true },
  staffId: { type: String, required: false }, // Using String just in case it's an email or a string ID
  content: { type: String, required: true },
  status: { type: String, enum: ['Not Solved', 'In Progress', 'Solved'], default: 'Not Solved' },
  upvotes: { type: Number, default: 0 },
  upvotedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Grievance', grievanceSchema);
