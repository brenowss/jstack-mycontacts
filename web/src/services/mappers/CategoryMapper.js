class CategoryMapper {
  toDomain(category) {
    return {
      id: category.id,
      name: category.name
    };
  }
}

export default new CategoryMapper();
