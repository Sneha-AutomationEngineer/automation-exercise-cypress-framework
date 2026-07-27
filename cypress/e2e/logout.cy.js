import LoginPage from '../../pages/loginPage';
import HomePage from '../../pages/homePage';

describe('Logout Scenario', function(){

let loginPage;   
let loginData;
let homePage;

   before(function(){
      cy.fixture('loginData').then((testdata) =>{
        loginData = testdata;
        loginPage = new LoginPage();
        homePage = new HomePage();
      })
    })
    
    beforeEach(function(){
        cy.visit('/');
        homePage.openLoginPage();
    })

    it('User should logout successfully', function(){
        loginPage.login(loginData.username, loginData.password);
        homePage.verifyLoggedInUser(loginData.user);
        homePage.clickLogout();
        loginPage.verifySignUpPage();
    })
})