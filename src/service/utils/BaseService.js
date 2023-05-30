import GenericError from '@/utils/GenericError';
export default class BaseService {

  failure({ code, message }) {
    throw new GenericError(code, message);
  }

  success(body = {}) {
    return {
      body: body,
      success: true
    };
  }

  async httpRequestGet(URL, params) {
    const fetchURL = `${URL}?${new URLSearchParams(params).toString()} `;
    const request = fetch(fetchURL, {
      method: 'GET'
    });
    return (await request).json();
  }
}
