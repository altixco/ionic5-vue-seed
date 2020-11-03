import api from './index';

export default {
  testForAuthenticatedUser() {
    return api.get('/api/sales/me/');
  }
}
