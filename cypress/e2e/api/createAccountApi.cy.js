const {
  warmUpApiSession,
  apiRequest,
  parseApiBody,
} = require('../../support/apiUtils');

describe('Create Account API', { testIsolation: false }, () => {
  let createdEmail;
  let createdPassword;

  before(() => {
    warmUpApiSession();
  });

  it('should create a new account successfully', () => {
    cy.fixture('registrationData').then((data) => {
      createdEmail = 'user_' + Date.now() + '@test.com';
      createdPassword = data.password;

      apiRequest({
        method: 'POST',
        url: '/api/createAccount',
        form: true,
        body: {
          name: data.firstName + ' ' + data.lastName,
          email: createdEmail,
          password: createdPassword,
          title: 'Mrs',
          birth_date: data.birthDay,
          birth_month: data.birthMonth,
          birth_year: data.birthYear,
          firstname: data.firstName,
          lastname: data.lastName,
          company: data.company,
          address1: data.address1,
          address2: data.address2,
          country: data.country,
          zipcode: data.zipcode,
          state: data.state,
          city: data.city,
          mobile_number: data.mobilenumber,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const responseBody = parseApiBody(response.body, response.status);
        expect(responseBody.responseCode).to.eq(201);
        expect(responseBody.message).to.eq('User created!');
      });
    });
  });

  it('should update user account successfully', () => {
    apiRequest({
      method: 'PUT',
      url: '/api/updateAccount',
      form: true,
      body: {
        name: 'Updated User',
        email: createdEmail,
        password: createdPassword,
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1995',
        firstname: 'Updated',
        lastname: 'User',
        company: 'Updated Company',
        address1: 'Updated Address',
        address2: 'Address 2',
        country: 'India',
        zipcode: '411001',
        state: 'Maharashtra',
        city: 'Pune',
        mobile_number: '9876543210',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = parseApiBody(response.body, response.status);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody.message).to.eq('User updated!');
    });
  });

  it('should delete user account successfully', () => {
    apiRequest({
      method: 'DELETE',
      url: '/api/deleteAccount',
      form: true,
      body: {
        email: createdEmail,
        password: createdPassword,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = parseApiBody(response.body, response.status);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody.message).to.eq('Account deleted!');
    });
  });
});
