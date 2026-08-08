import HomePage from '../../pages/homePage';
import ProductsPage from '../../pages/productsPage';
import LoginPage from '../../pages/loginPage';
import CartPage from '../../pages/cartPage';

let homePage;
let productsPage;
let productsData;
let loginPage;
let cartPage;
let loginData;
let cartData;

describe('Search product and verify login', function () {

    before(function () {
        cy.fixture('productsData').then((testData) => {
            productsData = testData;
        })

        cy.fixture('cartData').then((testData) => {
            cartData = testData;
        })

        cy.fixture('loginData').then((testData) => {
            loginData = testData;
        })
    })

    beforeEach(function () {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('/', {
            onBeforeLoad(win) {
                win.sessionStorage.clear();
            }
        });
        homePage.verifyHomePageDisplayed();
    })

    homePage = new HomePage();
    productsPage = new ProductsPage();
    loginPage = new LoginPage();
    cartPage = new CartPage();

    it('Should search product and verify login successfully', function () {
        homePage.openCartPage();
        cartPage.clearCartIfNotEmpty();
        homePage.openProductsPage();
        productsPage.verifyProductsPageDisplayed(productsData.productPageHeaderText);
        productsPage.searchProduct(productsData.searchProducts.jeans);
        productsPage.verifySearchedProductDisplayed(productsData.searchedProductsHeader);
        productsPage.verifyProductsListDisplayed();
        productsPage.captureAndAddSearchedProducts(productsData.continueShopping).then(({ productPrices, productNames, totalProducts }) => {
            cartPage.verifyProductsCount(totalProducts);
            cartPage.verifyProductPriceByName(productNames, productPrices);
            cartPage.verifyProductQuantity(cartData.defaultQuantity);
            cartPage.verifyIndividualProductTotal(productPrices);
            homePage.openLoginPage()
            loginPage.login(loginData.username, loginData.password);
            homePage.verifyLoggedInUser(loginData.user);
            homePage.openCartPage();
            cartPage.removeUnexpectedProducts(productNames);
            cartPage.verifyProductPriceByName(productNames, productPrices);
            cartPage.verifyProductsCount(totalProducts);
        })
    })
})
