import CartPage from '../../pages/cartPage';
import CheckOutPage from '../../pages/checkOutPage';
import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import RegistrationPage from '../../pages/registrationPage';
import ProductPage from '../../pages/productsPage';
import PaymentPage from '../../pages/paymentPage';

describe('Place product and checkout', function () {

    let homePage;
    let cartPage;
    let loginPage;
    let registrationPage;
    let randomEmail;
    let checkOutPage;
    let productPage;
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

    beforeEach(function () {
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
        randomEmail = `sneha${Date.now()}@gmail.com`;
    })

    homePage = new HomePage();
    cartPage = new CartPage();
    loginPage = new LoginPage();
    registrationPage = new RegistrationPage();
    checkOutPage = new CheckOutPage();
    productPage = new ProductPage();
    paymentPage = new PaymentPage();

    it('Should register during checkout and place the order successfully', function () {
        homePage.openProductsPage();
        productPage.captureAndAddFirstTwoProducts(productsData.continueShopping).then(({ productPrices, productNames }) => {
            cartPage.verifyProductsInCart();
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
            homePage.deleteAccount();
            homePage.verifyAccountDeletedAndClickContinue(homePageData.accountDeletedMessage, homePageData.continueAfterAccountDelete);
        });
    })
})