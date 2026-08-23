import LoginPage from '../../../pages/loginPage';
import HomePage from '../../../pages/homePage';

describe('Logout Scenario', function () {

  let loginPage;
  let loginData;
  let homePage;

  before(function () {
    cy.fixture('loginData').then((testdata) => {
      loginData = testdata;
      loginPage = new LoginPage();
      homePage = new HomePage();
    });
  });

  beforeEach(function () {
    cy.visit('/');
  });

  it('User should logout successfully', function () {
    cy.loginAs(loginData.username, loginData.password, loginData.user);
    homePage.clickLogout();
    loginPage.verifySignUpPage();
  });
});