const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: '' },
    designation: { type: String, trim: true, default: '' },
    photo: {
      url: { type: String, default: '' },
      publicId: { type: String, default: '' },
    },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    message: { type: String, required: true, trim: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
