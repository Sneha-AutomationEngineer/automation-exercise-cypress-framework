export default class HomePage {

    loginLink = '[href="/login"]';
    logoutLink = '[href="/logout"]';
    homePageVerify = '#slider-carousel';
    testCasePageLink = ' li a[href="/test_cases"]';
    productsPageLink = 'a[href="/products"]';
    subscriptionHeader = '.single-widget h2';
    subscriptionEmailBox = '#susbscribe_email';
    subscriptionArrowButton = '#subscribe';
    subscriptionSuccessMessage = '.alert-success';
    shoppingCartLink = 'li a[href="/view_cart"]';

    openLoginPage() {
        cy.get(this.loginLink).click();
    }

    verifyLoggedInUser(user) {
        cy.contains("Logged in as " + user).should('be.visible');
    }

    clickLogout() {
        cy.get(this.logoutLink).click();
    }

    verifyHomePageDisplayed() {
        cy.get(this.homePageVerify).should('be.visible');
    }

    openTestCasesPage() {
        cy.get(this.testCasePageLink).click();
    }

    openProductsPage() {
        cy.get(this.productsPageLink).click();
    }

    scrollTo(scrollBottom) {
        cy.scrollTo(scrollBottom);
    }

    verifySubscriptionText(subscriptionHeader) {
        cy.get(this.subscriptionHeader).should('have.text', subscriptionHeader);
    }

    subscribeWithEmail(username) {
        cy.get(this.subscriptionEmailBox).type(username);
        cy.get(this.subscriptionArrowButton).click();
    }

    verifySubscriptionSuccessMessage(subscriptionSuccessMessage){
        cy.get(this.subscriptionSuccessMessage).should('have.text', subscriptionSuccessMessage);
    }

    openCartPage(){
        cy.get(this.shoppingCartLink).click();
    }
}