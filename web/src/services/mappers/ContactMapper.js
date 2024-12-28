class ContactMapper {
  toPersistence(contact) {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      category_id: contact.categoryId
    };
  }

  toDomain(contact) {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      category: {
        id: contact.category_id,
        name: contact.category_name
      }
    };
  }
}

export default new ContactMapper();
