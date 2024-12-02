const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../Backend/config.env' });

const TicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    },
    description: {
      type: String,
      required: [true, 'please enter a description of the issue'],
      unique: true,
    },
    status: {
      type: String,
      enum: ['new', 'open', 'closed'],
      required: [true, 'Password is required'], // Ensures the field is presen
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);
