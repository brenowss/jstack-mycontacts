const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(req, res) {
    try {
      const categories = await CategoriesRepository.findAll();

      return res.json(categories);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    return res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.update(id, { name });

    return res.json(category);
  }

  async delete(req, res) {
    const { id } = req.params;

    await CategoriesRepository.delete(id);

    // 204: No content
    return res.sendStatus(204);
  }

  async show(req, res) {
    const { id } = req.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.json(category);
  }
}

module.exports = new CategoryController();
