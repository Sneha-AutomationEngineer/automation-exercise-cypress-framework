import LoginPage from '../../pages/LoginPage'
import HomePage from '../../pages/HomePage'

describe('Login Scenarios', () => {

  let loginPage;
  let data;
  let homePage;

  before(function(){
    cy.fixture('loginData').then((testdata) =>{
      data = testdata;
      loginPage = new LoginPage();
      homePage = new HomePage();
    })
  })

  beforeEach(function(){
    cy.visit('/');
    homePage.openLoginPage();
  })

  it('should login successfully with valid credentials', () => {
    loginPage.login(data.username, data.password);
    homePage.verifyLoggedInUser(data.user);
  })

  it('should display an error for invalid username', () => {
    loginPage.login(data.inValidUsername,data.password);
    loginPage.verifyLoginError(data.loginErrorMessage);
  })

   it('should display an error for invalid password', () => {
    loginPage.login(data.username,data.inValidPassword);
    loginPage.verifyLoginError(data.loginErrorMessage);
  })

   it('should display an error for invalid credentials', () => {
    loginPage.login(data.inValidUsername, data.inValidPassword);
    loginPage.verifyLoginError(data.loginErrorMessage);
  })
})