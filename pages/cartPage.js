export default class CartPage {

    numberOfProducts = 'tr[id^="product-"]';;
    cartPrice = '.cart_price p';
    cartQuantity = '.cart_quantity button';
    productTotalPrice = 'tr[id^="product-"] .cart_total_price';
    grandTotalPrice = 'tr:last-child .cart_total_price';
    cartProductName = 'a[href*="/product_details/"]';
    checkOutButton = '.check_out';
    registerOrLoginLink = 'p a[href="/login"]';
    commentBoxInCart = 'textarea[name="message"]';
    tableRow = 'tr[id^="product-"]';
    removeProduct = '.cart_quantity_delete';
    cartPageBreadCrumb = '.breadcrumb .active'

    verifyCartPageDisplayed() {
        cy.get(this.cartPageBreadCrumb).should('be.visible');
    }

    verifyProductsInCart() {
        cy.get(this.numberOfProducts).should('have.length', 2);
    }

    verifyProductPrice(productPrices) {
        cy.get(this.cartPrice).should('have.length', productPrices.length).each(($price, index) => {
            cy.wrap($price).invoke('text').then((cartPrice) => {
                expect(cartPrice.trim()).to.equal(productPrices[index]);
            });
        });
    }

    // Order-independent: match price by product name (survives login cart merge/reorder)
    verifyProductPriceByName(productNames, productPrices) {
        expect(productNames.length).to.equal(productPrices.length);

        productNames.forEach((name, index) => {
            cy.contains(this.tableRow, name).should('be.visible').find(this.cartPrice).invoke('text').then((cartPrice) => {
                expect(cartPrice.trim()).to.equal(productPrices[index]);
            });
        });
    }

    // Delete leftover account-cart rows that were not part of this test's adds
    removeUnexpectedProducts(expectedNames) {
        const removeNextUnexpected = () => {
            cy.get('body').then(($body) => {
                let unexpectedName = null;

                $body.find(this.tableRow).each((_, row) => {
                    const name = Cypress.$(row).find(this.cartProductName).first().text().trim();

                    if (name && !expectedNames.includes(name)) {
                        unexpectedName = name;
                        return false;
                    }
                });

                if (!unexpectedName) {
                    return;
                }

                cy.contains(this.tableRow, unexpectedName).find(this.removeProduct).click();

                cy.contains(this.cartProductName, unexpectedName).should('not.exist');
                removeNextUnexpected();
            });
        };
        removeNextUnexpected();
    }

    verifyProductName(productNames) {
        cy.get(this.cartProductName).should('have.length', productNames.length).each(($name, index) => {
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
            expect(Number(grandTotal.replace('Rs. ', '').trim())).to.equal(expectedGrandTotal);
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

    clearCartIfNotEmpty() {
        cy.get('body').then(($body) => {
            const count = $body.find(this.removeProduct).length;

            if (count === 0) {
                return;
            }

            cy.get(this.removeProduct).first().click();

            cy.get(this.removeProduct).should('have.length', count - 1);

            this.clearCartIfNotEmpty();
        });
    }
}