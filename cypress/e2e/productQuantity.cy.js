import HomePage from '../../pages/homePage';
import ProductsPage from '../../pages/productsPage';
import CartPage  from '../../pages/cartPage';

describe('Product Quantity', function(){

    let homePage;
    let productsPage;
    let cartData;
    let productsData;
    let cartPage;

    before(function(){
        cy.fixture('productsData').then((testData)=>{
            productsData = testData;
        })

        cy.fixture('cartData').then((testData)=>{
            cartData = testData;
        })
    })

    beforeEach(function(){
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })
    
    homePage = new HomePage();
    productsPage = new ProductsPage();
    cartPage = new CartPage();

    it('should verify total product quantity in cart', function(){
        homePage.openProductsPage();
        productsPage.openFirstProductDetails();
        productsPage.verifyProductDetailsDisplayed();
        productsPage.editProductQuantity(cartData.quantityOfProduct);
        productsPage.clickAddToCartButton();
        productsPage.clickViewCartLinkInPopup();
        cartPage.verifyProductQuantity(cartData.quantityOfProduct);
    })
})