import HomePage from '../../pages/homePage';

describe('Scroll up without arrow', function () {

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

    it('Should scroll up successfully without arrow', function () {
        homePage.scrollTo(homePageData.scrollBottom);
        homePage.verifySubscriptionText(homePageData.subscriptionHeader);
        homePage.scrollTo(homePageData.scrollTop);
        homePage.verifyHomeBannerPage(homePageData.homePageBannerText);
    })
})