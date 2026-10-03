const mongoose = require('mongoose');
const slugify = require('slugify');

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String },
    alt: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    category: { type: String, required: true, trim: true },
    client: { type: String, trim: true, default: '' },
    industry: { type: String, trim: true, default: '' },
    services: [{ type: String, trim: true }],
    timeline: { type: String, trim: true, default: '' },
    role: { type: String, trim: true, default: '' },
    year: { type: Number, required: true },
    description: { type: String, trim: true, default: '' },
    challenge: { type: String, trim: true, default: '' },
    concept: { type: String, trim: true, default: '' },
    process: [
      {
        stage: { type: String, trim: true },
        detail: { type: String, trim: true },
      },
    ],
    coverImage: imageSchema,
    galleryImages: [imageSchema],
    tags: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.pre('validate', function (next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

projectSchema.index({ category: 1, published: 1 });
projectSchema.index({ featured: 1, published: 1 });
projectSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Project', projectSchema);
