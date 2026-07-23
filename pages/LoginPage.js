export default class LoginPage {

    loginHeader = ".login-form h2";
    emailTextbox = 'input[data-qa="login-email"]';
    passwordTextbox = 'input[data-qa="login-password"]'
    loginButton = 'button[data-qa="login-button"]';
    newUserRegistrationHeader = '.signup-form h2';

    login(username, password) {
        cy.get(this.loginHeader).should('have.text', 'Login to your account');
        cy.get(this.emailTextbox).type(username);
        cy.get(this.passwordTextbox).type(password);
        cy.get(this.loginButton).click();
    }

    verifyLoginError(expectedErrorMessage){
        cy.contains(expectedErrorMessage).should('be.visible');        
    }

    verifySignUpPage(){
        cy.get(this.newUserRegistrationHeader).should('have.text','New User Signup!');
    }
}