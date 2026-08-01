import HomePage from '../../pages/homePage';
import ProductsPage from '../../pages/productsPage';
import CartPage from '../../pages/cartPage';

let productsPage;
let homePage;
let cartPage;
let productsData;
let cartData;

describe('Remove Product', function () {

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

    it('Should remove product from cart successfully', function () {
        productsPage.captureAndAddFirstTwoProducts(productsData.continueShopping);
        cartPage.verifyProductsInCart();
        cartPage.removeProductFromCart(cartData.productName);
        cartPage.verifyProductRemoved(cartData.productName);
    })
})