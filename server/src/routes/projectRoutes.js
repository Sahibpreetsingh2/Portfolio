const express = require('express');
const {
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
} = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Public
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);

// Admin (must come before the public /:slug catch-all)
router.get('/admin/all', protect, authorize('admin', 'editor'), getAllProjectsAdmin);
router.post('/', protect, authorize('admin', 'editor'), createProject);
router.put('/:id', protect, authorize('admin', 'editor'), updateProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);
router.patch('/:id/publish', protect, authorize('admin', 'editor'), togglePublish);
router.post('/:id/cover', protect, authorize('admin', 'editor'), upload.single('image'), uploadCoverImage);
router.post('/:id/gallery', protect, authorize('admin', 'editor'), upload.array('images', 20), uploadGalleryImages);
router.delete('/:id/gallery/:imageId', protect, authorize('admin', 'editor'), deleteGalleryImage);
router.patch('/:id/gallery/reorder', protect, authorize('admin', 'editor'), reorderGalleryImages);

// Public slug route last
router.get('/:slug', getProjectBySlug);

module.exports = router;
