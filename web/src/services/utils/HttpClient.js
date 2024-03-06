import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async makeRequest(path, options) {
    const headers = new Headers();
    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers
    });

    const contentType = response.headers.get('Content-Type');
    let responseBody = null;

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers
    });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers
    });
  }

  put(path, options) {
    return this.makeRequest(path, { method: 'PUT', body: options.body });
  }

  delete(path) {
    return this.makeRequest(path, { method: 'DELETE' });
  }

  patch(path, options) {
    return this.makeRequest(path, { method: 'PATCH', body: options.body });
  }
}

export default HttpClient;
