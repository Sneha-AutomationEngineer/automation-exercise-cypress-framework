import HomePage from '../../pages/homePage';
import ProductsPage from '../../pages/productsPage';

describe('View and Cart Brand Product', function(){

    let homePage;
    let productsPage;

    beforeEach(function(){
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })

    homePage = new HomePage();
    productsPage = new ProductsPage();

    it('Should view selected brand Products', function(){
        homePage.openProductsPage();
        productsPage.verifyBrandNavigation();
    })
})