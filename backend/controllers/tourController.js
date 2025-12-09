const Tour = require('../models/Tour');
const Itinerary = require('../models/Itinerary');
const TourAddon = require('../models/TourAddon');

// Get all tours
exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await Tour.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json(tours);
  } catch (error) {
    next(error);
  }
};

// Get tour by ID with itinerary and addons
exports.getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    const itinerary = await Itinerary.findAll({
      where: { tour_id: id },
      order: [['step_number', 'ASC']],
    });

    const addons = await TourAddon.findAll({
      where: { tour_id: id },
    });

    res.json({
      ...tour.toJSON(),
      itinerary,
      addons,
    });
  } catch (error) {
    next(error);
  }
};

// Get tour by slug
exports.getTourBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const tour = await Tour.findOne({ where: { slug } });

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    const itinerary = await Itinerary.findAll({
      where: { tour_id: tour.id },
      order: [['step_number', 'ASC']],
    });

    const addons = await TourAddon.findAll({
      where: { tour_id: tour.id },
    });

    res.json({
      ...tour.toJSON(),
      itinerary,
      addons,
    });
  } catch (error) {
    next(error);
  }
};

// Create tour (admin)
exports.createTour = async (req, res, next) => {
  try {
    const { itinerary, addons, ...tourData } = req.body;
    const tour = await Tour.create(tourData);

    if (itinerary && Array.isArray(itinerary)) {
      await Itinerary.bulkCreate(
        itinerary.map((item) => ({ ...item, tour_id: tour.id }))
      );
    }

    if (addons && Array.isArray(addons)) {
      await TourAddon.bulkCreate(
        addons.map((item) => ({ ...item, tour_id: tour.id }))
      );
    }

    res.status(201).json(tour);
  } catch (error) {
    next(error);
  }
};

// Update tour (admin)
exports.updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { itinerary, addons, ...tourData } = req.body;

    const tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    await tour.update(tourData);

    if (itinerary && Array.isArray(itinerary)) {
      await Itinerary.destroy({ where: { tour_id: id } });
      await Itinerary.bulkCreate(
        itinerary.map((item) => ({ ...item, tour_id: id }))
      );
    }

    if (addons && Array.isArray(addons)) {
      await TourAddon.destroy({ where: { tour_id: id } });
      await TourAddon.bulkCreate(
        addons.map((item) => ({ ...item, tour_id: id }))
      );
    }

    res.json(tour);
  } catch (error) {
    next(error);
  }
};

// Delete tour (admin)
exports.deleteTour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }

    await tour.destroy();
    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    next(error);
  }
};

