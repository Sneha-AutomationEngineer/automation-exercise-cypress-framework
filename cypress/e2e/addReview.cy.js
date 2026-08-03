import HomePage from '../../pages/homePage';
import ProductsPage from '../../pages/productsPage';
import LoginPage from '../../pages/loginPage';

describe('Add Review', function(){

    let homePage;
    let productsPage;
    let loginPage;
    let loginData;
    let productsData;

    before(function(){
        cy.fixture('productsData').then((testData)=>{
            productsData = testData;
        })

         cy.fixture('loginData').then((testData)=>{
            loginData = testData;
        })
    })

    beforeEach(function(){
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })

    homePage = new HomePage();
    productsPage = new ProductsPage();
    loginPage = new LoginPage();

    it('Should add review on products successfully', function(){
        homePage.openProductsPage();
        productsPage.verifyProductsPageDisplayed(productsData.productPageHeaderText);
        productsPage.verifyProductsListDisplayed();
        productsPage.openFirstProductDetails();
        productsPage.verifyReviewText(productsData.reviewHeaderText);
        productsPage.enterReviewDetails(loginData.user, loginData.username, productsData.reviewComment)
        productsPage.submitReview();
        productsPage.verifySuccessMessageForReview(productsData.successMessageAfterReviewSubmit);
    })
})