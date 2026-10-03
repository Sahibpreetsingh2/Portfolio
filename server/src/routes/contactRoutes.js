const express = require('express');
const { createMessage, getMessages, markStatus, deleteMessage } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', createMessage);
router.get('/', protect, authorize('admin', 'editor'), getMessages);
router.patch('/:id/read', protect, authorize('admin', 'editor'), (req, res, next) => {
  req.body.status = 'read';
  markStatus(req, res, next);
});
router.patch('/:id/unread', protect, authorize('admin', 'editor'), (req, res, next) => {
  req.body.status = 'unread';
  markStatus(req, res, next);
});
router.delete('/:id', protect, authorize('admin'), deleteMessage);

module.exports = router;
