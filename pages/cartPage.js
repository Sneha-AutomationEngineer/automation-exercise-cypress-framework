export default class CartPage {

    numberOfProducts = 'tbody tr';
    cartPrice = '.cart_price p';
    cartQuantity = '.cart_quantity button';
    productTotalPrice = 'tr[id^="product-"] .cart_total_price';
    grandTotalPrice = 'tr:last-child .cart_total_price';
    cartProductName = 'a[href*="/product_details/"]';
    checkOutButton = '.check_out';
    registerOrLoginLink = 'p a[href="/login"]';
    commentBoxInCart = 'textarea[name="message"]';
    tableRow = 'tbody tr';
    removeProduct = '.cart_quantity_delete';

    verifyProductsInCart() {
        cy.get(this.numberOfProducts).should('have.length', 2);
    }

    verifyProductPrice(productPrices) {
        cy.get(this.cartPrice).should('have.length', productPrices.length).each(($price, index) => {
            cy.wrap($price).invoke('text').then((cartPrice) => {
                expect(cartPrice).to.equal(productPrices[index]);
            });
        });
    }

    verifyProductName(productNames) {
        cy.get(this.cartProductName).should('have.length', 2).each(($name, index) => {
            cy.wrap($name).invoke('text').then((productName) => {
                expect(productName).to.equal(productNames[index]);
            });
        })
    }

    verifyProductQuantity(expectedQuantity) {
        cy.get(this.cartQuantity).each(($quantity) => {
            cy.wrap($quantity).should('be.visible').should('have.text', expectedQuantity);
        })
    }

    verifyIndividualProductTotal(productPrices) {
        cy.get(this.productTotalPrice).should('have.length', productPrices.length).each(($totalPrice, index) => {
            cy.wrap($totalPrice).invoke('text').then((cartPrice) => {
                expect(cartPrice).to.equal(productPrices[index]);
            });
        })
    }

    verifyGrandTotal(productPrices) {
        const expectedGrandTotal = productPrices.reduce((total, price) => {
            return total + Number(price.replace('Rs. ', '').trim());
        }, 0);
        cy.get(this.grandTotalPrice).invoke('text').then((grandTotal) => {
            expect(Number(grandTotal.replace('Rs. ', '')
                .trim())).to.equal(expectedGrandTotal);
        });
    }

    clickCheckoutButton() {
        cy.get(this.checkOutButton).click();
    }

    registerOrLoginPopupLink() {
        cy.get(this.registerOrLoginLink).click();
    }

    enterMessageInCommentBox(message) {
        cy.get(this.commentBoxInCart).type(message);
    }

    removeProductFromCart(productName) {
        cy.contains(this.tableRow, productName).find(this.removeProduct).click();
    }

    verifyProductRemoved(productName) {
        cy.contains(this.cartProductName, productName).should('not.exist');
    }

    verifyProductsCount(expectedCount) {
        cy.get(this.tableRow).should('have.length', expectedCount)
    }
}