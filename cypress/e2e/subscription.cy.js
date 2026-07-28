import HomePage from '../../pages/homePage';

describe('Subscription Page', function () {

    let homePage;
    let homePageData;
    let loginData;

    before(function () {
        cy.fixture('homePageData').then((testData) => {
            homePageData = testData;
        })

        cy.fixture('loginData').then((testData) => {
            loginData = testData;
        })

        homePage = new HomePage();
    })

    beforeEach(function () {
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })

    it('should subscribe successfully from the home page', function () {
        homePage.scrollTo(homePageData.scrollBottom);
        homePage.verifySubscriptionText(homePageData.subscriptionHeader);
        homePage.subscribeWithEmail(loginData.username);
        homePage.verifySubscriptionSuccessMessage(homePageData.subscriptionSuccessMessage);
    })

    it('should subscribe successfully from the cart page', function () {
        homePage.openCartPage();
        homePage.scrollTo(homePageData.scrollBottom);
        homePage.verifySubscriptionText(homePageData.subscriptionHeader);
        homePage.subscribeWithEmail(loginData.username);
        homePage.verifySubscriptionSuccessMessage(homePageData.subscriptionSuccessMessage);
    })
})