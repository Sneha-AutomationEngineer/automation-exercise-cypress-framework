export default class RegistrationPage {

    signupNameTextbox = 'input[data-qa="signup-name"]';
    newUserEmailTextBox = 'input[data-qa="signup-email"]';
    signUpButton = 'button[data-qa="signup-button"]';
    preFilledUserName = '#name';
    preFilledEmail = '#email';
    birthDayDropdown = '#days';
    birthMonthDropdown = '#months';
    birthYearDropdown = '#years';
    genderSelectionRadio = '#id_gender2';
    registrationPasswordTextbox = '#password';
    newsletterCheckbox = '#newsletter';
    offersCheckbox = '#optin';
    firstNameTextBox = '#first_name';
    lastNameTextBox = '#last_name';
    companyTextBox = '#company';
    address1TextBox = '#address1';
    address2TextBox = '#address2';
    countryDropdown = '#country';
    stateTextBox = '#state';
    cityTextBox = '#city';
    zipcodeTextBox = '#zipcode';
    mobileNumberTextBox = '#mobile_number';
    createAccountButton = 'button[data-qa="create-account"]';
    accountCreatedTitle = '.title';
    existingEmailErrorMessage = 'Email Address already exist!';

    enterSignupDetails(user, randomEmail) {
        cy.get(this.signupNameTextbox).type(user);
        cy.get(this.newUserEmailTextBox).type(randomEmail);
        cy.get(this.signUpButton).click();
    }

    verifyPreFilledInformation(user, randomEmail) {
        cy.get(this.preFilledUserName).should('have.value', user);
        cy.get(this.preFilledEmail).should('have.value', randomEmail);
    }

    enterBirthDate(birthDay, birthMonth, birthYear) {
        cy.get(this.birthDayDropdown).select(birthDay);
        cy.get(this.birthMonthDropdown).select(birthMonth);
        cy.get(this.birthYearDropdown).select(birthYear);
    }

    enterAccountInformation(registrationData) {
        cy.get(this.genderSelectionRadio).check().should('be.checked');
        cy.get(this.registrationPasswordTextbox).type(registrationData.password);
        this.enterBirthDate(registrationData.birthDay,registrationData.birthMonth,registrationData.birthYear);
        cy.get(this.newsletterCheckbox).check().should('be.checked');
        cy.get(this.offersCheckbox).check().should('be.checked');
    }

    enterAddressInformation(registrationData) {
        cy.get(this.firstNameTextBox).type(registrationData.firstName);
        cy.get(this.lastNameTextBox).type(registrationData.lastName);
        cy.get(this.companyTextBox).type(registrationData.company);
        cy.get(this.address1TextBox).type(registrationData.address1);
        cy.get(this.address2TextBox).type(registrationData.address2);
        cy.get(this.countryDropdown).select(registrationData.country);
        cy.get(this.stateTextBox).type(registrationData.state);
        cy.get(this.cityTextBox).type(registrationData.city);
        cy.get(this.zipcodeTextBox).type(registrationData.zipcode);
        cy.get(this.mobileNumberTextBox).type(registrationData.mobilenumber);
    }

    clickCreateAccount() {
        cy.get(this.createAccountButton).click();
    }

    verifyAccountCreated() {
        cy.get(this.accountCreatedTitle).should('have.text', 'Account Created!')
    }

    enterRegisteredEmail(user, username) {
        cy.get(this.signupNameTextbox).type(user);
        cy.get(this.newUserEmailTextBox).type(username);
        cy.get(this.signUpButton).click();
    }

    verifyExistingEmailErrorMessage() {
        cy.contains(this.existingEmailErrorMessage).should('be.visible');
    }
    clickContinueButtonAfterRegistration(continueTextAfterRegistartion) {
        cy.contains(continueTextAfterRegistartion).click();
    }
}