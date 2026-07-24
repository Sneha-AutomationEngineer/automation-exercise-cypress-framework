import ContactUsPage from '../../pages/contactUSPage';
import HomePage from '../../pages/homePage';

describe('Contact Us Form', function () {

    let loginData;
    let contactUSPage;
    let contactUsData;
    let homePage;

    before(function () {
        cy.fixture('loginData').then((testData) => {
            loginData = testData;
        })

        cy.fixture('contactUsData').then((testData) => {
            contactUsData = testData;
        })

        contactUSPage = new ContactUsPage();
        homePage = new HomePage();
    })

    beforeEach(function () {
        cy.visit('/');
    })

    it('should submit the Contact Us form successfully', function () {
        contactUSPage.openContactUs();
        contactUSPage.fillContactForm(loginData.user, loginData.username, contactUsData.subjectMessage, contactUsData.message);
        contactUSPage.uploadFile();
        contactUSPage.submitContactForm();
        contactUSPage.verifySubmissionSuccess();
        contactUSPage.navigateToHomePage();
        homePage.verifyHomePageDisplayed();
    })
})