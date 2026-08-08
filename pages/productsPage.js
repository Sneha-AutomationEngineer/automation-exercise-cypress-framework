export default class ProductPage {

    productsPageHeader = 'h2.title.text-center';
    products = '.features_items';
    productCards = '.product-image-wrapper';
    productInformation = '.product-information';
    productName = 'h2';
    productInformationText = 'p';
    productPrice = 'span span';
    searchBar = '#search_product';
    searchIconButton = '#submit_search';
    searchedProductDetail = '.productinfo p';
    viewCartLinkInPopup = 'a[href="/view_cart"] u';
    addCartButton = '.productinfo .add-to-cart';
    priceTag = '.productinfo h2';
    viewProductButton = 'a[href*="/product_details"]';
    quantityButton = '#quantity';
    addCartInProductDeatilPage = '.cart';
    brandLink = 'div.brands_products';
    brandSection = 'Brands';
    brandHeader = '.title';
    reviewHeader = 'a[href*="#reviews"]';
    reviewTextBox = 'textarea[name="review"]';
    emailTextBoxInReviewSection = '#email';
    nameTextBoxInReviewSection = '#name';
    submitReviewButton = '#button-review';
    successMessageAfterReview = '#review-section .alert-success';

    verifyProductsPageDisplayed(productPageHeaderText) {
        cy.get(this.productsPageHeader).should('have.text', productPageHeaderText);
    }

    verifyProductsListDisplayed() {
        cy.get(this.products).should('be.visible');

        cy.get(this.productCards).then(($cards) => {
            console.log("Product cards found:", $cards.length);
        });

        cy.get(this.productCards).should('have.length.greaterThan', 0);
    }

    clickFirstViewProduct(viewProductText) {
        cy.get(this.productCards).first().find('a').contains(viewProductText).click();
    }

    verifyProductDetailsDisplayed() {
        cy.get(this.productInformation).within(() => {
            cy.get(this.productName).should('be.visible').invoke('text').should('not.be.empty');;
            cy.contains(this.productInformationText, 'Category').should('be.visible');
            cy.get(this.productPrice).should('be.visible').invoke('text').should('not.be.empty');;
            cy.contains(this.productInformationText, 'Availability').should('be.visible');
            cy.contains(this.productInformationText, 'Condition').should('be.visible');
            cy.contains(this.productInformationText, 'Brand').should('be.visible');
        })
    }

    searchProduct(productName) {
        cy.get(this.searchBar).type(productName);
        cy.get(this.searchIconButton).click();
    }

    verifySearchedProductDisplayed(productsPageHeader) {
        cy.get(this.productsPageHeader).should('contain.text', productsPageHeader);
    }

    verifySearchedProduct(productName) {
        cy.get(this.searchedProductDetail).should('contain.text', productName);
    }

    captureAndAddSearchedProducts(continueShopping) {
        const productPrices = [];
        const productNames = [];

        return cy.get(this.products).find(this.productCards).then(($products) => {
            const uniqueProducts = [];
            const seenNames = new Set();

            $products.each((_, el) => {
                const name = Cypress.$(el).find(this.searchedProductDetail).first().text().trim();

                if (name && !seenNames.has(name)) {
                    seenNames.add(name);
                    uniqueProducts.push({ el, name });
                }
            });

            const totalProducts = uniqueProducts.length;

            return cy.wrap(uniqueProducts).each((product, index) => {
                productNames.push(product.name);

                return cy.wrap(product.el).find(this.priceTag).invoke('text').then((price) => {
                    productPrices.push(price.trim());
                }).then(() => {
                    return cy.wrap(product.el).find(this.addCartButton).should('be.visible').click();
                }).then(() => {
                    if (index < totalProducts - 1) {
                        return cy.contains(continueShopping).should('be.visible').click().then(() => {
                            cy.contains(continueShopping).should('not.be.visible');
                        });
                    }

                    return cy.get(this.viewCartLinkInPopup).should('be.visible').click();
                });
            }).then(() => ({ productPrices, productNames, totalProducts }));
        });
    }

    captureAndAddFirstTwoProducts(continueShopping) {
        const productPrices = [];
        const productNames = [];

        return cy.get(this.products).find(this.productCards).then(($products) => {
            const productsToAdd = [];
            const seenNames = new Set();

            $products.each((_, el) => {
                if (productsToAdd.length >= 2) {
                    return false;
                }

                const name = Cypress.$(el).find(this.searchedProductDetail).first().text().trim();

                if (name && !seenNames.has(name)) {
                    seenNames.add(name);
                    productsToAdd.push({ el, name });
                }
            });

            const totalProducts = productsToAdd.length;

            return cy.wrap(productsToAdd).each((product, index) => {
                productNames.push(product.name);

                return cy.wrap(product.el).find(this.priceTag).invoke('text').then((price) => {
                    productPrices.push(price.trim());
                }).then(() => {
                    return cy.wrap(product.el).find(this.addCartButton).should('be.visible').click();
                }).then(() => {
                    if (index < totalProducts - 1) {
                        return cy.contains(continueShopping).should('be.visible').click().then(() => {
                            cy.contains(continueShopping).should('not.be.visible');
                        });
                    }

                    return cy.get(this.viewCartLinkInPopup).should('be.visible').click();
                });
            }).then(() => ({
                productPrices,
                productNames
            }));
        });
    }

    openFirstProductDetails() {
        cy.get(this.productCards).first().within(() => {
            cy.get(this.viewProductButton).click();
        })
    }

    editProductQuantity(quantityOfProduct) {
        cy.get(this.quantityButton).clear().type(quantityOfProduct);
    }

    clickAddToCartButton() {
        cy.get(this.addCartInProductDeatilPage).click();
    }

    clickViewCartLinkInPopup() {
        cy.get(this.viewCartLinkInPopup).click();
    }

    verifyBrandNavigation() {
        const brandData = [{ brandName: 'H&M', expectedHeader: 'Brand - H&M Products' }, {
            brandName: 'Babyhug', expectedHeader: 'Brand - Babyhug Products'
        }]

        brandData.forEach((data) => {
            cy.get(this.brandLink).should('be.visible').and('contain.text', this.brandSection);
            cy.get(`a[href*="/brand_products/${data.brandName}"]`).click();
            cy.contains(this.brandHeader, data.expectedHeader).should('be.visible');
        })
    }

    verifyReviewText(reviewHeaderText) {
        cy.get(this.reviewHeader).should('have.text', reviewHeaderText);
    }

    enterNameForReview(user) {
        cy.get(this.nameTextBoxInReviewSection).type(user)
    }

    enterEmailIdForReview(emailId) {
        cy.get(this.emailTextBoxInReviewSection).type(emailId);
    }

    enterReviewForProduct(reviewComment) {
        cy.get(this.reviewTextBox).type(reviewComment)
    }

    submitReview() {
        cy.get(this.submitReviewButton).click();
    }

    verifySuccessMessageForReview(successMessageAfterReviewSubmit) {
        cy.get(this.successMessageAfterReview).should('be.visible').should('contain.text', successMessageAfterReviewSubmit)
    }

    enterReviewDetails(user, username, reviewComment) {
        this.enterNameForReview(user);
        this.enterEmailIdForReview(username);
        this.enterReviewForProduct(reviewComment);
    }
}
