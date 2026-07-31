import HomePage from '../../pages/homePage';
import ProductPage from '../../pages/productsPage';

describe('Product Page', function(){

    let homePage;
    let productPage;
    let productsData;

    before(function(){
        cy.fixture('productsData').then((testData)=>{
            productsData = testData;
        })
    })

    beforeEach(function(){
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })

    homePage = new HomePage();
    productPage = new ProductPage();

    it('should display all products and product details successfully', function () {
        homePage.openProductsPage();
        productPage.verifyProductsPageDisplayed(productsData.productPageHeaderText);
        productPage.verifyProductsListDisplayed();
        productPage.clickFirstViewProduct(productsData.viewProductText); 
        productPage.verifyProductDetailsDisplayed();
    })
})