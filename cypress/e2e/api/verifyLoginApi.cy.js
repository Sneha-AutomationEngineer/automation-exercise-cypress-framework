describe('Verify Login API', () => {
    let loginData;
  
    before(() => {
      cy.fixture('loginData').then((data) => {
        loginData = data;
      });
    });
  
    const verifyLogin = (body = {}) => {
      return cy.request({
        method: 'POST',
        url: '/api/verifyLogin',
        form: true,
        body,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        return typeof response.body === 'string'
          ? JSON.parse(response.body)
          : response.body;
      });
    };
  
    it('should verify login with valid details', () => {
      verifyLogin({
        email: loginData.username,
        password: loginData.password
      }).then((body) => {
        expect(body.responseCode).to.eq(200);
        expect(body.message).to.eq('User exists!');
      });
    });
  
    it('should verify login without email parameter', () => {
      verifyLogin({
        password: loginData.password
      }).then((body) => {
        expect(body.responseCode).to.eq(400);
        expect(body.message)
          .to.eq('Bad request, email or password parameter is missing in POST request.');
      });
    });
  
    it('should verify DELETE request is not supported', () => {
      cy.request({
        method: 'DELETE',
        url: '/api/verifyLogin',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
        const body = JSON.parse(response.body);
        expect(body.responseCode).to.eq(405);
        expect(body.message).to.eq('This request method is not supported.');
      });
    });
  
    it('should reject login with invalid details', () => {
      verifyLogin({
        email: loginData.inValidUsername,
        password: loginData.inValidPassword
      }).then((body) => {
        expect(body.responseCode).to.eq(404);
        expect(body.message).to.eq('User not found!');
      });
    });
  });