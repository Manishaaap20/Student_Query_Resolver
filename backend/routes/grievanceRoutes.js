const express = require('express');
const router = express.Router();
const Grievance = require('../models/Grievance');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/grievances
// @desc    Get all grievances (Admin) or logged-in student's grievances (Student)
router.get('/', protect, async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const grievances = await Grievance.find({}).sort({ createdAt: -1 });
      res.json(grievances);
    } else {
      const grievances = await Grievance.find({ studentId: req.user._id }).sort({ createdAt: -1 });
      res.json(grievances);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/grievances
// @desc    Create a new grievance
router.post('/', protect, async (req, res) => {
  try {
    const { content, department, staffId } = req.body;

    const grievance = new Grievance({
      studentId: req.user._id,
      studentName: req.user.name,
      department,
      staffId,
      content,
    });

    const createdGrievance = await grievance.save();
    res.status(201).json(createdGrievance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/grievances/:id/status
// @desc    Update grievance status (Admin only)
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const grievance = await Grievance.findById(req.params.id);

    if (grievance) {
      grievance.status = status;
      const updatedGrievance = await grievance.save();
      res.json(updatedGrievance);
    } else {
      res.status(404).json({ message: 'Grievance not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/grievances/:id/upvote
// @desc    Upvote a grievance (Any logged-in user)
router.put('/:id/upvote', protect, async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (grievance) {
      // Check if user already upvoted
      if (grievance.upvotedBy.includes(req.user._id)) {
        return res.status(400).json({ message: 'Already upvoted' });
      }

      grievance.upvotes += 1;
      grievance.upvotedBy.push(req.user._id);

      const updatedGrievance = await grievance.save();
      res.json(updatedGrievance);
    } else {
      res.status(404).json({ message: 'Grievance not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
