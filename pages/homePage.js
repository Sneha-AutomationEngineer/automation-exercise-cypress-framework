export default class HomePage {

    loginLink = '[href="/login"]';
    logoutLink = '[href="/logout"]';
    homePageVerify = '#slider-carousel';
    testCasePageLink = ' li a[href="/test_cases"]';
    productsPageLink = 'a[href="/products"]';

    openLoginPage() {
        cy.get(this.loginLink).click();
    }

    verifyLoggedInUser(user) {
        cy.contains("Logged in as " + user).should('be.visible');
    }

    clickLogout(){
        cy.get(this.logoutLink).click();
    }

    verifyHomePageDisplayed(){
        cy.get(this.homePageVerify).should('be.visible');
    }

    openTestCasesPage(){
        cy.get(this.testCasePageLink).click();
    }

    openProductsPage(){
        cy.get(this.productsPageLink).click();
    }

}