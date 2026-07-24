export default class HomePage {

    loginLink = '[href="/login"]';
    logoutLink = '[href="/logout"]';
    homePageVerify = '#slider-carousel';

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
}