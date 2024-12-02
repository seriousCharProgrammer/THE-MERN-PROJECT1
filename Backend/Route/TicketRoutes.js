const express = require('express');
const { protect } = require('../Middleware/Authmiddleware');
const {
  getTickets,
  createTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} = require('../Controllers/TicketController');
const router = express.Router();
const noteRouter = require('./noteRoute');
router.use('/:ticketId/notes', noteRouter);
router.route('/').get(protect, getTickets).post(protect, createTickets);

router
  .route('/:id')
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);
module.exports = router;
