import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:5151');
  }

  async listCategories() {
    const response = await this.httpClient.get('/categories');

    return response.map(CategoryMapper.toDomain);
  }
}

export default new CategoriesService();
