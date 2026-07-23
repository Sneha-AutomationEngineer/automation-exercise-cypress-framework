import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/homePage';

describe('Logout Scenario', function(){

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

    it('User should logout successfully', function(){
        loginPage.login(data.username, data.password);
        homePage.verifyLoggedInUser(data.user);
        homePage.clickLogout()();
        loginPage.verifySignUpPage();
    })
})