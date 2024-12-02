const asyncHandler = require('express-async-handler');
const User = require('../Model/UserModel');
const Ticket = require('../Model/TicketModel');
const bcrypt = require('bcryptjs');
const errorResponse = require('../Utils/errorResponse');
const TicketModel = require('../Model/TicketModel');
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (password === '') {
    res.status(400).json({
      success: false,
      message: 'password cannot be empty string',
    });
    t;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      user,
    });
  } else {
    throw new errorResponse(400, 'something went wrong');
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('please  provide and email', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('wrong email or password please retry'), 401);
  }
  const ismatch = await user.matchPassword(password);
  if (!ismatch) {
    return next(new ErrorResponse('wrong email or password please retry'), 401);
  }

  sendTokenResponse(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const tickets = await Ticket.find({ user: req.user.id });

  const user = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    tickets: tickets.length > 0 ? tickets : 0,
  };
  res.status(200).json(user);
});

const sendTokenResponse = function (user, statuscode, res) {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 40 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statuscode).cookie('token', token, options).json({
    success: true,
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
  });
};
