import LoginPage from '../../pages/loginPage'
import HomePage from '../../pages/HomePage'

describe('Login Scenarios', () => {

  let loginPage;
  let loginData;
  let homePage;

  before(function () {
    cy.fixture('loginData').then((testdata) => {
      loginData = testdata;
      loginPage = new LoginPage();
      homePage = new HomePage();
    })
  })

  beforeEach(function () {
    cy.visit('/');
    homePage.openLoginPage();
  })

  it('should login successfully with valid credentials', () => {
    loginPage.login(loginData.username, loginData.password);
    homePage.verifyLoggedInUser(loginData.user);
  })

  it('should display an error for invalid username', () => {
    loginPage.login(loginData.inValidUsername, loginData.password);
    loginPage.verifyLoginError(loginData.loginErrorMessage);
  })

  it('should display an error for invalid password', () => {
    loginPage.login(loginData.username, loginData.inValidPassword);
    loginPage.verifyLoginError(loginData.loginErrorMessage);
  })

  it('should display an error for invalid credentials', () => {
    loginPage.login(loginData.inValidUsername, loginData.inValidPassword);
    loginPage.verifyLoginError(loginData.loginErrorMessage);
  })
})