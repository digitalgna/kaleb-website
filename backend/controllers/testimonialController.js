const Testimonial = require('../models/Testimonial');

// Get all approved testimonials
exports.getTestimonials = async (req, res, next) => {
  try {
    const { approved } = req.query;
    const where = approved !== undefined ? { approved: approved === 'true' } : { approved: true };

    const testimonials = await Testimonial.findAll({
      where,
      order: [['created_at', 'DESC']],
    });
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

// Create testimonial
exports.createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create({
      ...req.body,
      approved: false, // Require admin approval
    });
    res.status(201).json(testimonial);
  } catch (error) {
    next(error);
  }
};

// Update testimonial (admin)
exports.updateTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    await testimonial.update(req.body);
    res.json(testimonial);
  } catch (error) {
    next(error);
  }
};

// Delete testimonial (admin)
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    await testimonial.destroy();
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};

