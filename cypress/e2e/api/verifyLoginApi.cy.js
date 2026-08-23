const {
  warmUpApiSession,
  apiRequest,
  parseApiBody,
} = require('../../support/apiUtils');

describe('Verify Login API', { testIsolation: false }, () => {
  let loginData;

  before(() => {
    warmUpApiSession();
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  const verifyLogin = (body = {}) => {
    return apiRequest({
      method: 'POST',
      url: '/api/verifyLogin',
      form: true,
      body,
    }).then((response) => {
      expect(response.status).to.eq(200);
      return parseApiBody(response.body, response.status);
    });
  };

  it('should verify login with valid details', () => {
    verifyLogin({
      email: loginData.username,
      password: loginData.password,
    }).then((body) => {
      expect(body.responseCode).to.eq(200);
      expect(body.message).to.eq('User exists!');
    });
  });

  it('should verify login without email parameter', () => {
    verifyLogin({
      password: loginData.password,
    }).then((body) => {
      expect(body.responseCode).to.eq(400);
      expect(body.message).to.eq(
        'Bad request, email or password parameter is missing in POST request.'
      );
    });
  });

  it('should verify DELETE request is not supported', () => {
    apiRequest({
      method: 'DELETE',
      url: '/api/verifyLogin',
    }).then((response) => {
      expect(response.status).to.eq(200);
      const body = parseApiBody(response.body, response.status);
      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');
    });
  });

  it('should reject login with invalid details', () => {
    const invalidCase = loginData.invalidLoginCases.find(
      (testCase) => testCase.title === 'invalid credentials'
    );

    verifyLogin({
      email: invalidCase.username,
      password: invalidCase.password,
    }).then((body) => {
      expect(body.responseCode).to.eq(404);
      expect(body.message).to.eq('User not found!');
    });
  });
});
