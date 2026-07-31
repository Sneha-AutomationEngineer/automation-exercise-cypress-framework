import HomePage from '../../pages/homePage';
import ProductsPage from '../../pages/productsPage';
import CartPage from '../../pages/cartPage';

describe('Add Products', function () {

    let homePage;
    let productsPage;
    let cartPage;
    let productsData;
    let cartData;

    before(function () {
        cy.fixture('productsData').then((testData) => {
            productsData = testData;
        })
         cy.fixture('cartData').then((testData) => {
            cartData = testData;
        })
    })


    beforeEach(function () {
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })
    homePage = new HomePage();
    productsPage = new ProductsPage();
    cartPage = new CartPage();

    it('Should add products in cart successfully', function () {
        homePage.openProductsPage();
        productsPage.captureAndAddFirstTwoProducts(productsData.continueShopping).then((productPrices) => {
            cartPage.verifyProductsInCart();
            cartPage.verifyProductPrice(productPrices);
            cartPage.verifyProductQuantity(cartData.defaultQuantity);
            cartPage.verifyIndividualProductTotal(productPrices);
        });
    })
})