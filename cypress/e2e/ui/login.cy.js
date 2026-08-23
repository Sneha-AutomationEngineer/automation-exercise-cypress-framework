import LoginPage from '../../../pages/loginPage';
import HomePage from '../../../pages/homePage';

const loginData = require('../../fixtures/loginData.json');

describe('Login Scenarios', () => {

  let loginPage;
  let homePage;

  before(function () {
    loginPage = new LoginPage();
    homePage = new HomePage();
  });

  beforeEach(function () {
    cy.visit('/');
    homePage.openLoginPage();
  });

  it('should login successfully with valid credentials', () => {
    loginPage.login(loginData.username, loginData.password);
    homePage.verifyLoggedInUser(loginData.user);
  });

  loginData.invalidLoginCases.forEach((testCase) => {
    it(`should display an error for ${testCase.title}`, () => {
      loginPage.login(testCase.username, testCase.password);
      loginPage.verifyLoginError(loginData.loginErrorMessage);
    });
  });
});