import HomePage from "../../pages/homePage"
import LoginPage from "../../pages/LoginPage";
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
        registrationPage.enterAccountInformation(registrationData.password, registrationData.birthDay, registrationData.birthMonth, registrationData.birthYear);
        registrationPage.enterAddressInformation(loginData.user, registrationData.lastName, registrationData.company, registrationData.address1, registrationData.address2, registrationData.country, registrationData.state, registrationData.city, registrationData.zipcode, registrationData.mobilenumber)
        registrationPage.clickCreateAccount();
        registrationPage.verifyAccountCreated();
    })

    it.only('Register user with existing email should not allow', function () {
        registrationPage.enterRegisteredEmail(loginData.user, loginData.username);
        registrationPage.verifyExistingEmailErrorMessage();
    })
})