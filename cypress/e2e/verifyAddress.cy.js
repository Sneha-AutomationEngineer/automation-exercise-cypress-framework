import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import ProductsPage from '../../pages/productsPage';
import RegistrationPage from '../../pages/registrationPage';
import CartPage from '../../pages/cartPage';
import CheckOutPage from '../../pages/checkOutPage';

describe('Verify address details in checkout page', function () {

    let homePage;
    let loginPage;
    let registrationPage;
    let productsPage;
    let productsData;
    let cartPage;
    let loginData;
    let checkOutPage;
    let randomEmail;
    let registrationData;
    let homePageData;

    beforeEach(function () {
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
        randomEmail = `sneha${Date.now()}@gmail.com`;
    })

    before(function () {
        cy.fixture('productsData').then((testData) => {
            productsData = testData;
        })

        cy.fixture('loginData').then((testData) => {
            loginData = testData;
        })

        cy.fixture('registrationData').then((testData) => {
            registrationData = testData;
        })

        cy.fixture('homePageData').then((testData) => {
            homePageData = testData;
        })
    })

    homePage = new HomePage();
    loginPage = new LoginPage();
    registrationPage = new RegistrationPage();
    productsPage = new ProductsPage();
    cartPage = new CartPage();
    checkOutPage = new CheckOutPage();

    it('Should verify address details in checkout page', function () {
        homePage.openLoginPage();
        loginPage.verifySignUpPage();
        registrationPage.enterSignupDetails(loginData.user, randomEmail);
        registrationPage.verifyPreFilledInformation(loginData.user, randomEmail);
        registrationPage.enterAccountInformation(registrationData);
        registrationPage.enterAddressInformation(registrationData);
        registrationPage.clickCreateAccount();
        registrationPage.verifyAccountCreated();
        registrationPage.clickContinueButtonAfterRegistration(registrationData.continueTextAfterRegistartion);
        homePage.verifyLoggedInUser(loginData.user);
        productsPage.captureAndAddFirstTwoProducts(productsData.continueShopping).then(() => {
            cartPage.verifyProductsInCart();
            cartPage.clickCheckoutButton();
            checkOutPage.verifyAddresses(registrationData);
            homePage.deleteAccount();
            homePage.verifyAccountDeletedAndClickContinue(homePageData.accountDeletedMessage,
homePageData.continueAfterAccountDelete
            );
        });
    })
})