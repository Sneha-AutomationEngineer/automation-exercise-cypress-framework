export default class TestCasePage{

    testCasePageHeader = '.title';

    verifyTestCasePageHeader(){
    cy.get(this.testCasePageHeader).should('be.visible').and('have.text','Test Cases');
    }
}