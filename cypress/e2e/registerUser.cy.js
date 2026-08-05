import HomePage from "../../pages/homePage"
import LoginPage from "../../pages/loginPage";
import RegistrationPage from '../../pages/registrationPage'

describe('New User Registration', function () {

    let homePage;
    let registrationPage;
    let loginPage;
    let registrationData;
    let loginData;
    let randomEmail;

    before(function () {
        cy.fixture('loginData').then((testData) => {
            loginData = testData;
        })

        cy.fixture('registrationData').then((testData) => {
            registrationData = testData;
        })

        loginPage = new LoginPage();
        homePage = new HomePage();
        registrationPage = new RegistrationPage();

    })

    beforeEach(function () {
        cy.visit('/');
        homePage.openLoginPage();
        randomEmail = `sneha${Date.now()}@gmail.com`;
    })

    it('New User should be able to register successfully', function () {
        loginPage.verifySignUpPage();
        registrationPage.enterSignupDetails(loginData.user, randomEmail);
        registrationPage.verifyPreFilledInformation(loginData.user, randomEmail);
        registrationPage.enterAccountInformation(registrationData);
        registrationPage.enterAddressInformation(registrationData);
        registrationPage.clickCreateAccount();
        registrationPage.verifyAccountCreated();
    })

    it('Register user with existing email should not allow', function () {
        registrationPage.enterRegisteredEmail(loginData.user, loginData.username);
        registrationPage.verifyExistingEmailErrorMessage();
    })
})