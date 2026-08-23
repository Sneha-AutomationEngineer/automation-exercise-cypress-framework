const {
  warmUpApiSession,
  apiRequest,
  parseApiBody,
} = require('../../support/apiUtils');

describe('Get User Detail By Email API', { testIsolation: false }, () => {
  before(() => {
    warmUpApiSession();
  });

  it('should get user details by email', () => {
    cy.fixture('loginData').then((data) => {
      apiRequest({
        method: 'GET',
        url: '/api/getUserDetailByEmail',
        qs: { email: data.username },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const responseBody = parseApiBody(response.body, response.status);
        expect(responseBody.responseCode).to.eq(200);
        expect(responseBody.user).to.have.property('email');
      });
    });
  });
});
