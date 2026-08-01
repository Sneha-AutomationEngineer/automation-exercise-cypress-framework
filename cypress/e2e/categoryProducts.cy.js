import HomePage from '../../pages/homePage';

describe('Category Products', function () {

    let homePage;

    beforeEach(function () {
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })

    homePage = new HomePage();

    it('Should view selected category Products', function () {
        homePage.verifyCategoryNavigation();
    })
})
