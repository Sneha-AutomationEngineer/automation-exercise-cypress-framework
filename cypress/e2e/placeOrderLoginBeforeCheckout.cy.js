import CartPage from '../../pages/cartPage';
import CheckOutPage from '../../pages/checkOutPage';
import HomePage from '../../pages/homePage';
import LoginPage from '../../pages/loginPage';
import ProductPage from '../../pages/productsPage';
import PaymentPage from '../../pages/paymentPage';

describe('Place Order: Login before Checkout', function () {

    let homePage;
    let cartPage;
    let loginPage;
    let checkOutPage;
    let productPage;
    let productsData;
    let homePageData;
    let cartData;
    let paymentPage;
    let paymentsData;
    let loginData;
    let existingUserData;


    before(function () {
        cy.fixture('loginData').then((testData) => {
            loginData = testData;
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

        cy.fixture('existingUserData').then((testData) => {
            existingUserData = testData;
        })

        cy.fixture('homePageData').then((testData) => {
            homePageData = testData;
        });
    })

    beforeEach(function () {
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })

    homePage = new HomePage();
    cartPage = new CartPage();
    loginPage = new LoginPage();
    checkOutPage = new CheckOutPage();
    productPage = new ProductPage();
    paymentPage = new PaymentPage();

    it('should place an order after login and complete checkout successfully', function () {
        homePage.openLoginPage();
        loginPage.login(loginData.username, loginData.password);
        homePage.verifyLoggedInUser(loginData.user);
        productPage.captureAndAddFirstTwoProducts(productsData.continueShopping).then(({ productPrices, productNames }) => {
            homePage.openCartPage();
            cartPage.verifyProductsInCart();
            cartPage.clickCheckoutButton();
            checkOutPage.verifyAddresses(loginData, existingUserData);
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
        })
    })
})