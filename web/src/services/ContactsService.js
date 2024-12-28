import HttpClient from './utils/HttpClient';
import ContactMapper from './mappers/ContactMapper';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:5151');
  }

  async listContacts(orderBy = 'asc') {
    const response = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);

    return response.map(ContactMapper.toDomain);
  }

  async getContactById(id) {
    const response = await this.httpClient.get(`/contacts/${id}`);

    return ContactMapper.toDomain(response);
  }

  createContact(contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.post('/contacts', {
      body
    });
  }

  updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.put(`/contacts/${id}`, {
      body
    });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
