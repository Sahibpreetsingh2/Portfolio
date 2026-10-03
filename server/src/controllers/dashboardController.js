const asyncHandler = require('../middleware/asyncHandler');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const Contact = require('../models/Contact');

const getStats = asyncHandler(async (req, res) => {
  const [totalProjects, publishedProjects, draftProjects, totalMessages, unreadMessages, totalTestimonials, viewsAgg] =
    await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ published: true }),
      Project.countDocuments({ published: false }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
      Testimonial.countDocuments(),
      Project.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
    ]);

  res.status(200).json({
    success: true,
    data: {
      totalProjects,
      publishedProjects,
      draftProjects,
      totalMessages,
      unreadMessages,
      totalTestimonials,
      totalViews: viewsAgg[0]?.total || 0,
    },
  });
});

module.exports = { getStats };
