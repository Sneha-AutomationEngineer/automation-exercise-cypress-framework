import HomePage from "../../pages/homePage"
import LoginPage from "../../pages/LoginPage";
import RegistrationPage from '../../pages/registrationPage'

describe('New User Registration', function () {

    let homePage;
    let registrationPage;
    let loginPage;
    let data;
    let randomEmail;

    before(function () {
        cy.fixture('loginData').then((testData) => {
            data = testData;
            loginPage = new LoginPage;
            homePage = new HomePage();
            registrationPage = new RegistrationPage();
        })
    })

    beforeEach(function () {
        cy.visit('/');
        homePage.openLoginPage();
        randomEmail = `sneha${Date.now()}@gmail.com`;
    })

    it('New User should be able to register successfully', function () {
        loginPage.verifySignUpPage();
        registrationPage.enterSignupDetails(data.user, randomEmail);
        registrationPage.verifyPreFilledInformation(data.user, randomEmail);
        registrationPage.enterAccountInformation(data.password, data.birthDay, data.birthMonth, data.birthYear);
        registrationPage.enterAddressInformation(data.user, data.lastName, data.company, data.address1, data.address2, data.country, data.state, data.city, data.zipcode, data.mobilenumber)
        registrationPage.clickCreateAccount();
        registrationPage.verifyAccountCreated();
    })
})