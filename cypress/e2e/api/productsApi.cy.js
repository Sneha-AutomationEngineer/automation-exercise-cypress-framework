const {
  warmUpApiSession,
  apiRequest,
  parseApiBody,
} = require('../../support/apiUtils');

describe('Products API', { testIsolation: false }, () => {
  before(() => {
    warmUpApiSession();
  });

  it('should get all products successfully', () => {
    apiRequest({ method: 'GET', url: '/api/productsList' }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = parseApiBody(response.body, response.status);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody).to.have.property('products');
      expect(responseBody.products).to.be.an('array');
      expect(responseBody.products.length).to.be.greaterThan(0);
    });
  });

  it('should verify POST request is not supported', () => {
    apiRequest({ method: 'POST', url: '/api/productsList' }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = parseApiBody(response.body, response.status);
      expect(responseBody.responseCode).to.eq(405);
      expect(responseBody.message).to.eq('This request method is not supported.');
    });
  });
});
