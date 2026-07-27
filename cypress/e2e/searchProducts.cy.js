import HomePage from '../../pages/homePage';
import ProductsPage from '../../pages/productsPage';

describe('Search Product', function(){

    let homePage;
    let productsPage;
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
    productsPage = new ProductsPage();

    it('Product should be visible after search', function(){
        homePage.openProductsPage();
        productsPage.verifyProductsPageDisplayed(productsData.productPageHeaderText);
        productsPage.searchProduct(productsData.productName);
        productsPage.verifySearchedProductDisplayed(productsData.productsPageHeader);
        productsPage.verifyProductsListDisplayed();
        productsPage.verifySearchedProduct(productsData.productName);
    })
})