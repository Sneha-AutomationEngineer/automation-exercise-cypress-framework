export default class CartPage {

    numberOfProducts = 'tbody tr';
    cartPrice = '.cart_price p';
    cartQuantity = '.cart_quantity button';
    cartTotalPrice = '.cart_total_price';

    verifyProductsInCart() {
        cy.get(this.numberOfProducts).should('have.length', 2);
    }

    verifyProductPrice(productPrices) {
        cy.get(this.cartPrice).should('have.length', 2).each(($price, index) => {
            cy.wrap($price).invoke('text').then((cartPrice) => {
                expect(cartPrice).to.equal(productPrices[index]);
            });
        })
    }

    verifyProductQuantity(expectedQuantity) {
        cy.get(this.cartQuantity).each(($quantity) => {
            cy.wrap($quantity).should('be.visible').should('have.text', expectedQuantity);
        })
    }

    verifyTotalPriceOfProduct(productPrices) {
    cy.get(this.cartTotalPrice).should('have.length', 2).each(($totalPrice, index) => {
            cy.wrap($totalPrice).invoke('text').then((cartPrice) => {
                expect(cartPrice).to.equal(productPrices[index]);
            });
        })
    }
}