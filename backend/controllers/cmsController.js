const SiteSetting = require('../models/SiteSetting');
const SiteContent = require('../models/SiteContent');
const ThemeColor = require('../models/ThemeColor');
const MediaLibrary = require('../models/MediaLibrary');
const SiteFeature = require('../models/SiteFeature');
const HeroSetting = require('../models/HeroSetting');
const SectionVisibility = require('../models/SectionVisibility');

// ============ Site Settings ============
exports.getSettings = async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    const settings = await SiteSetting.findAll({ where, order: [['category', 'ASC'], ['setting_key', 'ASC']] });
    
    // Convert to key-value object
    const settingsObj = {};
    settings.forEach(setting => {
      let value = setting.setting_value;
      if (setting.setting_type === 'boolean') value = value === 'true';
      if (setting.setting_type === 'number') value = parseFloat(value);
      if (setting.setting_type === 'json') value = JSON.parse(value || '{}');
      settingsObj[setting.setting_key] = value;
    });
    
    res.json(settingsObj);
  } catch (error) {
    next(error);
  }
};

exports.updateSetting = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value, type, category, description } = req.body;
    
    const [setting, created] = await SiteSetting.findOrCreate({
      where: { setting_key: key },
      defaults: {
        setting_key: key,
        setting_value: String(value),
        setting_type: type || 'text',
        category: category || 'general',
        description,
      },
    });
    
    if (!created) {
      setting.setting_value = String(value);
      if (type) setting.setting_type = type;
      if (category) setting.category = category;
      if (description) setting.description = description;
      await setting.save();
    }
    
    res.json(setting);
  } catch (error) {
    next(error);
  }
};

exports.updateMultipleSettings = async (req, res, next) => {
  try {
    const settings = req.body;
    const updates = [];
    
    for (const [key, value] of Object.entries(settings)) {
      const [setting] = await SiteSetting.findOrCreate({
        where: { setting_key: key },
        defaults: { setting_key: key, setting_value: String(value) },
      });
      setting.setting_value = String(value);
      updates.push(setting.save());
    }
    
    await Promise.all(updates);
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    next(error);
  }
};

// ============ Site Content ============
exports.getContent = async (req, res, next) => {
  try {
    const { section, page, language } = req.query;
    const where = {};
    if (section) where.section = section;
    if (page) where.page = page;
    if (language) where.language = language || 'en';
    
    const content = await SiteContent.findAll({ where });
    
    const contentObj = {};
    content.forEach(item => {
      contentObj[item.content_key] = item.content_value;
    });
    
    res.json(contentObj);
  } catch (error) {
    next(error);
  }
};

exports.updateContent = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value, type, section, page, language } = req.body;
    
    const [content, created] = await SiteContent.findOrCreate({
      where: { content_key: key },
      defaults: {
        content_key: key,
        content_value: value,
        content_type: type || 'text',
        section,
        page,
        language: language || 'en',
      },
    });
    
    if (!created) {
      content.content_value = value;
      if (type) content.content_type = type;
      if (section) content.section = section;
      if (page) content.page = page;
      await content.save();
    }
    
    res.json(content);
  } catch (error) {
    next(error);
  }
};

exports.updateMultipleContent = async (req, res, next) => {
  try {
    const content = req.body;
    const updates = [];
    
    for (const [key, value] of Object.entries(content)) {
      const [item] = await SiteContent.findOrCreate({
        where: { content_key: key },
        defaults: { content_key: key, content_value: String(value) },
      });
      item.content_value = String(value);
      updates.push(item.save());
    }
    
    await Promise.all(updates);
    res.json({ message: 'Content updated successfully' });
  } catch (error) {
    next(error);
  }
};

// ============ Theme Colors ============
exports.getColors = async (req, res, next) => {
  try {
    const colors = await ThemeColor.findAll({ order: [['color_category', 'ASC'], ['color_name', 'ASC']] });
    res.json(colors);
  } catch (error) {
    next(error);
  }
};

exports.updateColor = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { value, category } = req.body;
    
    const [color, created] = await ThemeColor.findOrCreate({
      where: { color_name: name },
      defaults: { color_name: name, color_value: value, color_category: category || 'primary' },
    });
    
    if (!created) {
      color.color_value = value;
      if (category) color.color_category = category;
      await color.save();
    }
    
    res.json(color);
  } catch (error) {
    next(error);
  }
};

exports.updateMultipleColors = async (req, res, next) => {
  try {
    const colors = req.body;
    const updates = [];
    
    for (const [name, value] of Object.entries(colors)) {
      const [color] = await ThemeColor.findOrCreate({
        where: { color_name: name },
        defaults: { color_name: name, color_value: value },
      });
      color.color_value = value;
      updates.push(color.save());
    }
    
    await Promise.all(updates);
    res.json({ message: 'Colors updated successfully' });
  } catch (error) {
    next(error);
  }
};

// ============ Media Library ============
exports.getMedia = async (req, res, next) => {
  try {
    const { category, type } = req.query;
    const where = {};
    if (category) where.category = category;
    if (type) where.file_type = type;
    
    const media = await MediaLibrary.findAll({ where, order: [['created_at', 'DESC']] });
    res.json(media);
  } catch (error) {
    next(error);
  }
};

exports.uploadMedia = async (req, res, next) => {
  try {
    // This will be handled by multer middleware
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const media = await MediaLibrary.create({
      filename: file.filename,
      original_filename: file.originalname,
      file_path: `/uploads/${file.filename}`,
      file_type: file.mimetype,
      file_size: file.size,
      alt_text: req.body.alt_text || '',
      description: req.body.description || '',
      category: req.body.category || 'general',
      uploaded_by: req.admin.id,
    });
    
    res.status(201).json(media);
  } catch (error) {
    next(error);
  }
};

exports.deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const media = await MediaLibrary.findByPk(id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    // Delete file from filesystem (implement file deletion logic)
    await media.destroy();
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// ============ Site Features ============
exports.getFeatures = async (req, res, next) => {
  try {
    const features = await SiteFeature.findAll({ order: [['feature_key', 'ASC']] });
    res.json(features);
  } catch (error) {
    next(error);
  }
};

exports.updateFeature = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { enabled, config } = req.body;
    
    const [feature] = await SiteFeature.findOrCreate({
      where: { feature_key: key },
      defaults: { feature_key: key, feature_name: key, enabled: enabled !== undefined ? enabled : true },
    });
    
    if (enabled !== undefined) feature.enabled = enabled;
    if (config) feature.feature_config = config;
    await feature.save();
    
    res.json(feature);
  } catch (error) {
    next(error);
  }
};

// ============ Hero Settings ============
exports.getHeroSettings = async (req, res, next) => {
  try {
    let hero = await HeroSetting.findByPk(1);
    if (!hero) {
      hero = await HeroSetting.create({});
    }
    res.json(hero);
  } catch (error) {
    next(error);
  }
};

exports.updateHeroSettings = async (req, res, next) => {
  try {
    let hero = await HeroSetting.findByPk(1);
    if (!hero) {
      hero = await HeroSetting.create(req.body);
    } else {
      await hero.update(req.body);
    }
    res.json(hero);
  } catch (error) {
    next(error);
  }
};

// ============ Section Visibility ============
exports.getSectionVisibility = async (req, res, next) => {
  try {
    const sections = await SectionVisibility.findAll({ order: [['order_index', 'ASC']] });
    res.json(sections);
  } catch (error) {
    next(error);
  }
};

exports.updateSectionVisibility = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { visible, order_index } = req.body;
    
    const [section] = await SectionVisibility.findOrCreate({
      where: { section_key: key },
      defaults: { section_key: key, section_name: key, visible: visible !== undefined ? visible : true },
    });
    
    if (visible !== undefined) section.visible = visible;
    if (order_index !== undefined) section.order_index = order_index;
    await section.save();
    
    res.json(section);
  } catch (error) {
    next(error);
  }
};

// ============ Get All CMS Data ============
exports.getAllCMSData = async (req, res, next) => {
  try {
    const [settings, content, colors, features, hero, sections] = await Promise.all([
      SiteSetting.findAll(),
      SiteContent.findAll(),
      ThemeColor.findAll(),
      SiteFeature.findAll(),
      HeroSetting.findByPk(1).then(h => h || HeroSetting.create({})),
      SectionVisibility.findAll({ order: [['order_index', 'ASC']] }),
    ]);
    
    // Format settings
    const settingsObj = {};
    settings.forEach(s => {
      let value = s.setting_value;
      if (s.setting_type === 'boolean') value = value === 'true';
      if (s.setting_type === 'number') value = parseFloat(value);
      if (s.setting_type === 'json') value = JSON.parse(value || '{}');
      settingsObj[s.setting_key] = value;
    });
    
    // Format content
    const contentObj = {};
    content.forEach(c => {
      contentObj[c.content_key] = c.content_value;
    });
    
    // Format colors
    const colorsObj = {};
    colors.forEach(c => {
      colorsObj[c.color_name] = c.color_value;
    });
    
    res.json({
      settings: settingsObj,
      content: contentObj,
      colors: colorsObj,
      features: features,
      hero: hero,
      sections: sections,
    });
  } catch (error) {
    next(error);
  }
};

