const asyncHandler = require('../middleware/asyncHandler');
const ApiError = require('../utils/apiError');
const Project = require('../models/Project');
const { streamUpload, deleteImage } = require('../utils/cloudinaryUpload');

// @desc    Get all published projects (public) with filtering, search, pagination
// @route   GET /api/projects
const getProjects = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 12 } = req.query;
  const query = { published: true };

  if (category && category.toLowerCase() !== 'all') {
    query.category = new RegExp(`^${category}$`, 'i');
  }
  if (search) {
    query.$text = { $search: search };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [projects, total] = await Promise.all([
    Project.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Project.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    count: projects.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: projects,
  });
});

// @desc    Get featured projects (public)
// @route   GET /api/projects/featured
const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ published: true, featured: true }).sort({ createdAt: -1 }).limit(6);
  res.status(200).json({ success: true, count: projects.length, data: projects });
});

// @desc    Get a single project by slug (public) and increment view count
// @route   GET /api/projects/:slug
const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOneAndUpdate(
    { slug: req.params.slug, published: true },
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!project) throw new ApiError(404, 'Project not found');

  const next = await Project.findOne({
    published: true,
    _id: { $ne: project._id },
  }).sort({ createdAt: 1 });

  res.status(200).json({ success: true, data: project, next: next || null });
});

// @desc    Get all projects incl. drafts (admin)
// @route   GET /api/projects/admin/all
const getAllProjectsAdmin = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: projects.length, data: projects });
});

// @desc    Create project (admin)
// @route   POST /api/projects
const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

// @desc    Update project (admin)
// @route   PUT /api/projects/:id
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) throw new ApiError(404, 'Project not found');
  res.status(200).json({ success: true, data: project });
});

// @desc    Delete project (admin)
// @route   DELETE /api/projects/:id
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');

  const publicIds = [
    project.coverImage?.publicId,
    ...project.galleryImages.map((img) => img.publicId),
  ].filter(Boolean);
  await Promise.all(publicIds.map((id) => deleteImage(id)));

  await project.deleteOne();
  res.status(200).json({ success: true, message: 'Project deleted' });
});

// @desc    Toggle publish state (admin)
// @route   PATCH /api/projects/:id/publish
const togglePublish = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  project.published = !project.published;
  await project.save();
  res.status(200).json({ success: true, data: project });
});

// @desc    Upload cover image (admin)
// @route   POST /api/projects/:id/cover
const uploadCoverImage = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No image file provided');
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');

  if (project.coverImage?.publicId) await deleteImage(project.coverImage.publicId);

  const result = await streamUpload(req.file.buffer, 'portfolio/covers');
  project.coverImage = { url: result.secure_url, publicId: result.public_id, alt: project.title };
  await project.save();

  res.status(200).json({ success: true, data: project });
});

// @desc    Upload gallery images (admin)
// @route   POST /api/projects/:id/gallery
const uploadGalleryImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) throw new ApiError(400, 'No image files provided');
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');

  const results = await Promise.all(req.files.map((f) => streamUpload(f.buffer, 'portfolio/gallery')));
  const newImages = results.map((r, i) => ({
    url: r.secure_url,
    publicId: r.public_id,
    alt: project.title,
    order: project.galleryImages.length + i,
  }));

  project.galleryImages.push(...newImages);
  await project.save();

  res.status(200).json({ success: true, data: project });
});

// @desc    Delete a single gallery image (admin)
// @route   DELETE /api/projects/:id/gallery/:imageId
const deleteGalleryImage = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');

  const image = project.galleryImages.id(req.params.imageId);
  if (!image) throw new ApiError(404, 'Image not found');

  await deleteImage(image.publicId);
  image.deleteOne();
  await project.save();

  res.status(200).json({ success: true, data: project });
});

// @desc    Reorder gallery images (admin)
// @route   PATCH /api/projects/:id/gallery/reorder
const reorderGalleryImages = asyncHandler(async (req, res) => {
  const { order } = req.body; // array of imageIds in desired order
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');

  order.forEach((imageId, index) => {
    const image = project.galleryImages.id(imageId);
    if (image) image.order = index;
  });
  project.galleryImages.sort((a, b) => a.order - b.order);
  await project.save();

  res.status(200).json({ success: true, data: project });
});

module.exports = {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
  togglePublish,
  uploadCoverImage,
  uploadGalleryImages,
  deleteGalleryImage,
  reorderGalleryImages,
};
