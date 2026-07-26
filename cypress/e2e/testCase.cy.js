import HomePage from '../../pages/homePage';
import TestCasePage from '../../pages/testCasePage';

describe('Test Cases Page', function(){

    let homePage;
    let testCasePage;

    beforeEach(function(){
        cy.visit('/');
        homePage.verifyHomePageDisplayed();
    })

    homePage = new HomePage();
    testCasePage = new TestCasePage();

    it('should navigate to the Test Cases page successfully', function(){
        homePage.openTestCasesPage();
        testCasePage.verifyTestCasePageHeader();
    })
})