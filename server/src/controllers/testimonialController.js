const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/apiError');
const Testimonial = require('../models/Testimonial');
const { streamUpload, deleteImage } = require('../utils/cloudinaryUpload');

const getTestimonials = asyncHandler(async (req, res) => {
  const filter = req.query.all === 'true' ? {} : { published: true };
  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: testimonials });
});

const createTestimonial = asyncHandler(async (req, res) => {
  let photo;
  if (req.file) {
    const result = await streamUpload(req.file.buffer, 'portfolio/testimonials');
    photo = { url: result.secure_url, publicId: result.public_id };
  }
  const testimonial = await Testimonial.create({ ...req.body, ...(photo && { photo }) });
  res.status(201).json({ success: true, data: testimonial });
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Testimonial not found');

  if (req.file) {
    if (testimonial.photo?.publicId) await deleteImage(testimonial.photo.publicId);
    const result = await streamUpload(req.file.buffer, 'portfolio/testimonials');
    testimonial.photo = { url: result.secure_url, publicId: result.public_id };
  }

  Object.assign(testimonial, req.body);
  await testimonial.save();
  res.status(200).json({ success: true, data: testimonial });
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) throw new ApiError(404, 'Testimonial not found');
  if (testimonial.photo?.publicId) await deleteImage(testimonial.photo.publicId);
  await testimonial.deleteOne();
  res.status(200).json({ success: true, message: 'Testimonial deleted' });
});

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
