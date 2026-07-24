export default class ContactUsPage{

    contactUSLink = '[href="/contact_us"]';
    contactUSHeader = '.contact-form h2';
    nameTextBox = 'input[name="name"]';
    emailTextBox = 'input[name="email"]';
    subjectTextBox = 'input[name="subject"]';
    messageTextBox = '#message';
    uploadFileButton = 'input[name="upload_file"]';
    submitButton = 'input[type="submit"]';
    successMessage = '.status';
    homePageNavigationButton = '.btn-success';
    sampleResumeFilePath = 'cypress/fixtures/SampleResume.txt';

    openContactUs(){
        cy.get(this.contactUSLink).click();
        cy.get(this.contactUSHeader).should('have.text', 'Get In Touch');
    }

    fillContactForm(user, username, subjectMessage, message){
        cy.get(this.nameTextBox).type(user);
        cy.get(this.emailTextBox).type(username);
        cy.get(this.subjectTextBox).type(subjectMessage);
        cy.get(this.messageTextBox).type(message)
    }

    uploadFile(){
        cy.get(this.uploadFileButton).selectFile(this.sampleResumeFilePath);
    }

    submitContactForm(){
        cy.get(this.submitButton).click();
    }

    verifySubmissionSuccess(){
        cy.get(this.successMessage).should('have.text','Success! Your details have been submitted successfully.')
    }

    navigateToHomePage(){
        cy.get(this.homePageNavigationButton).click();
    }
}
