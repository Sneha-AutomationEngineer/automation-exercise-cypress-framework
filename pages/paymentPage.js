export default class PaymentPage{

    paymentHeaderText = '.heading';
    nameOnCardTextBox = '[name="name_on_card"]';
    cardNumberTextBox = '.card-number';
    cardCVCTextBox = '.card-cvc';
    cardExpiryMonthTextBox = '.card-expiry-month';
    cardExpiryYearTextBox = '.card-expiry-year';
    submitButton = '#submit';

    verifyPaymentPageHeader(paymentHeaderText){
        cy.get(this.paymentHeaderText).contains(paymentHeaderText);
    }
    
    enterPaymentDetails(nameOnCard, paymentsData){
        cy.get(this.nameOnCardTextBox).type(nameOnCard);
        cy.get(this.cardNumberTextBox).type(paymentsData.cardNumber);
        cy.get(this.cardCVCTextBox).type(paymentsData.cardCVC);
        cy.get(this.cardExpiryMonthTextBox).type(paymentsData.cardExpiryMonth);
        cy.get(this.cardExpiryYearTextBox).type(paymentsData.cardExpiryYear);
    }

    submitPaymentDetails(){
        cy.get(this.submitButton).click();
    }

    verifySuccessMessageOfOrder(paymentsData){
        cy.contains(paymentsData.orderPlacedSuccessMessage).should('be.visible');
    }
}