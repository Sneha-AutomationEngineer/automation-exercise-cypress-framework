import HomePage from '../../pages/homePage';
import CartPage from '../../pages/cartPage';

describe('Add To Cart Recommended Items', function () {

    let homePage;
    let homePageData;
    let cartPage;

    before(function () {
        cy.fixture('homePageData').then((testData) => {
            homePageData = testData;
        })
    })

    beforeEach(function () {
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })

    homePage = new HomePage();
    cartPage = new CartPage();
    
    it('Should add recommended items in cart successfully', function () {
        homePage.scrollTo(homePageData.scrollBottom);
        homePage.verifyRecommendedItemsHeader(homePageData.recommendedItemsHeader)
        homePage.captureAndAddRecommendedProduct().then(({ productNames }) => {
            cartPage.verifyProductName(productNames);
        });
    })
})