const asyncHandler = require('express-async-handler');
const User = require('../Model/UserModel');
const Ticket = require('../Model/TicketModel');
const errorResponse = require('../Utils/errorResponse');
exports.getTickets = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new errorResponse(401, 'User not found');
  }
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

exports.createTickets = asyncHandler(async (req, res, next) => {
  const { product, description } = req.body;

  if (!product || !description) {
    throw new errorResponse(400, 'Please add a product and description');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    throw new errorResponse(401, 'User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

exports.getTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new errorResponse(401, 'User not found');
  }
  const ticket = await Ticket.findById(req.params.id);

  res.status(200).json(ticket);
});

exports.updateTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new errorResponse(401, 'User not found');
  }

  let ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new errorResponse(404, 'No ticket found');
  }
  if (ticket.user.toString() !== req.user.id) {
    throw new errorResponse(401, 'not Authorized');
  }
  ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body);
  ticket = await Ticket.findById(req.params.id);

  res.status(200).json({
    messgae: 'updated ticket',
    data: ticket,
  });
});

exports.deleteTicket = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new errorResponse(401, 'User not found');
  }
  let ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new errorResponse(404, 'No ticket found');
  }
  if (ticket.user.toString() !== req.user.id) {
    throw new errorResponse(401, 'not Authorized');
  }
  ticket = await Ticket.findByIdAndDelete(req.params.id);

  res.status(200).json({
    messgae: 'deleted ticket',
    data: null,
  });
});
