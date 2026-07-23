export default class HomePage {

    loginLink = '[href="/login"]';
    logoutLink = '[href="/logout"]';

    openLoginPage() {
        cy.get(this.loginLink).click();
    }

    verifyLoggedInUser(user) {
        cy.contains("Logged in as " + user).should('be.visible');
    }

    clickLogout(){
        cy.get(this.logoutLinkButton).click();
    }
}