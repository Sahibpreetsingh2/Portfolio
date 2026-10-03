const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/apiError');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// @desc    Register the first admin (blocked once an admin exists, use seed script instead)
// @route   POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const existing = await User.countDocuments();
  if (existing > 0) throw new ApiError(403, 'Registration is closed. Contact the site owner.');

  const { name, email, password } = req.body;
  if (!name || !email || !password) throw new ApiError(400, 'Name, email and password are required');

  const user = await User.create({ name, email, password, role: 'admin' });
  const token = generateToken(user._id);

  res.cookie('token', token, cookieOptions);
  res.status(201).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @desc    Login
// @route   POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, 'Email and password are required');

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user._id);
  res.cookie('token', token, cookieOptions);
  res.status(200).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

// @desc    Get current logged-in admin
// @route   GET /api/auth/me
const me = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

// @desc    Logout
// @route   POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out' });
});

module.exports = { register, login, me, logout };
