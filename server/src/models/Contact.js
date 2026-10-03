const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true, default: '' },
    projectType: {
      type: String,
      enum: ['Branding', 'Logo Design', 'UI/UX', 'Social Media', 'Packaging', 'Poster', 'Motion Graphics', 'Other'],
      required: true,
    },
    budget: {
      type: String,
      enum: ['$5–$10', '$10–$50', '$50–$200', '$200+'],
      required: true,
    },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ['unread', 'read'], default: 'unread' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
