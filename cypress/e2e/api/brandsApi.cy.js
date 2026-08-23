const {
  warmUpApiSession,
  apiRequest,
  parseApiBody,
} = require('../../support/apiUtils');

describe('Brands API', { testIsolation: false }, () => {
  before(() => {
    warmUpApiSession();
  });

  it('should get all brands successfully', () => {
    apiRequest({ method: 'GET', url: '/api/brandsList' }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = parseApiBody(response.body, response.status);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody).to.have.property('brands');
      expect(responseBody.brands).to.be.an('array');
      expect(responseBody.brands.length).to.be.greaterThan(0);
    });
  });

  it('should verify PUT request is not supported', () => {
    apiRequest({ method: 'PUT', url: '/api/brandsList' }).then((response) => {
      const responseBody = parseApiBody(response.body, response.status);
      expect(responseBody.responseCode).to.eq(405);
      expect(responseBody.message).to.eq('This request method is not supported.');
    });
  });
});
