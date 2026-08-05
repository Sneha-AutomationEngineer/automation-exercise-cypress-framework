import CartPage from '../../pages/cartPage';
import CheckOutPage from '../../pages/checkOutPage';
import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import RegistrationPage from '../../pages/registrationPage';
import ProductsPage from '../../pages/productsPage';
import PaymentPage from '../../pages/paymentPage';

describe('Download Invoice', function () {

    let homePage;
    let cartPage;
    let loginPage;
    let registrationPage;
    let randomEmail;
    let checkOutPage;
    let productsPage;
    let productsData;
    let homePageData;
    let cartData;
    let paymentPage;
    let paymentsData;
    let loginData;
    let registrationData;


    before(function () {
        cy.fixture('loginData').then((testData) => {
            loginData = testData;
        })

        cy.fixture('registrationData').then((testData) => {
            registrationData = testData;
        })

        cy.fixture('cartData').then((testData) => {
            cartData = testData;
        })

        cy.fixture('productsData').then((testData) => {
            productsData = testData;
        })

        cy.fixture('paymentsData').then((testData) => {
            paymentsData = testData;
        })

        cy.fixture('homePageData').then((testData) => {
            homePageData = testData;
        })
    })

    beforeEach(() => {
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
        randomEmail = `sneha${Date.now()}${Cypress._.random(1000, 9999)}@gmail.com`;
    });

    homePage = new HomePage();
    cartPage = new CartPage();
    loginPage = new LoginPage();
    registrationPage = new RegistrationPage();
    checkOutPage = new CheckOutPage();
    productsPage = new ProductsPage();
    paymentPage = new PaymentPage();

    it('Should download invoice after purchase order', function () {
        productsPage.captureAndAddFirstTwoProducts(productsData.continueShopping).then(({ productPrices, productNames }) => {
            cartPage.verifyProductsInCart();
            cartPage.verifyCartPageDisplayed();
            cartPage.clickCheckoutButton();
            cartPage.registerOrLoginPopupLink();
            loginPage.verifySignUpPage();
            registrationPage.enterSignupDetails(loginData.user, randomEmail);
            registrationPage.verifyPreFilledInformation(loginData.user, randomEmail);
            registrationPage.enterAccountInformation(registrationData);
            registrationPage.enterAddressInformation(registrationData);
            registrationPage.clickCreateAccount();
            registrationPage.verifyAccountCreated();
            registrationPage.clickContinueButtonAfterRegistration(registrationData.continueTextAfterRegistartion);
            homePage.verifyLoggedInUser(loginData.user);
            homePage.openCartPage();
            cartPage.clickCheckoutButton();
            checkOutPage.verifyAddresses(registrationData);
            cartPage.verifyProductPrice(productPrices);
            cartPage.verifyProductName(productNames);
            cartPage.verifyProductQuantity(cartData.defaultQuantity);
            cartPage.verifyGrandTotal(productPrices);
            cartPage.enterMessageInCommentBox(cartData.message);
            cartPage.clickCheckoutButton();
            paymentPage.verifyPaymentPageHeader(paymentsData.paymentHeaderText);
            paymentPage.enterPaymentDetails(loginData.user, paymentsData);
            paymentPage.submitPaymentDetails();
            paymentPage.verifySuccessMessageOfOrder(paymentsData);
            paymentPage.deleteDownloadedInvoice(paymentsData.invoiceFileName);
            paymentPage.clickOnDownloadInvoice();
            paymentPage.verifyDownloadedInvoice(paymentsData.invoiceFileName);
            paymentPage.clickContinueButton();
            homePage.deleteAccount();
            homePage.verifyAccountDeletedAndClickContinue(homePageData.accountDeletedMessage, homePageData.continueAfterAccountDelete);
        })
    })
})