const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/apiError');
const Contact = require('../models/Contact');

const createMessage = asyncHandler(async (req, res) => {
  const { name, email, projectType, budget, message } = req.body;
  if (!name || !email || !projectType || !budget || !message) {
    throw new ApiError(400, 'Name, email, project type, budget and message are required');
  }
  const contact = await Contact.create(req.body);
  res.status(201).json({
    success: true,
    message: "Thanks! Your message has been received. I'll get back to you shortly.",
    data: contact,
  });
});

const getMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: messages.length, data: messages });
});

const markStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // 'read' | 'unread'
  const message = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!message) throw new ApiError(404, 'Message not found');
  res.status(200).json({ success: true, data: message });
});

const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Contact.findByIdAndDelete(req.params.id);
  if (!message) throw new ApiError(404, 'Message not found');
  res.status(200).json({ success: true, message: 'Message deleted' });
});

module.exports = { createMessage, getMessages, markStatus, deleteMessage };
