import HomePage from '../../pages/homePage';

describe('Scroll up using arrow', function () {

    let homePage;
    let homePageData;

    beforeEach(function () {
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })

    before(function () {
        cy.fixture('homePageData').then((testData) => {
            homePageData = testData;
        })
    })

    homePage = new HomePage();

    it('Should scroll up successfully using arrow', function () {
        homePage.scrollTo(homePageData.scrollBottom);
        homePage.verifySubscriptionText(homePageData.subscriptionHeader);
        homePage.clickScrollUpArrow();
        homePage.verifyHomeBannerPage(homePageData.homePageBannerText);
    })
})