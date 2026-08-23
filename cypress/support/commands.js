import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';

Cypress.Commands.add('loginAs', (username, password, user) => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();

  homePage.openLoginPage();
  loginPage.login(username, password);
  homePage.verifyLoggedInUser(user);
});