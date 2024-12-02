const express = require('express');
const { protect } = require('../Middleware/Authmiddleware');
const router = express.Router({ mergeParams: true });
const { getNotes, addNote } = require('../Controllers/noteController.js');

router.route('/').get(protect, getNotes).post(protect, addNote);
module.exports = router;
