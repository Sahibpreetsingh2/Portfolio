const express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCategories);
router.post('/', protect, authorize('admin', 'editor'), createCategory);
router.put('/:id', protect, authorize('admin', 'editor'), updateCategory);
router.delete('/:id', protect, authorize('admin'), deleteCategory);

module.exports = router;
