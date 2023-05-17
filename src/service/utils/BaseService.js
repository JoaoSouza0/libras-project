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
}
