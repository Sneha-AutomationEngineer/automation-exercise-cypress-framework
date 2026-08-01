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
    viewCartButton = 'a[href*="/product_details"]';
    quantityButton = '#quantity';
    addCartInProductDeatilPage = '.cart';
    brandLink = 'div.brands_products';
    brandSection = 'Brands';
    brandHeader = '.title';

    verifyProductsPageDisplayed(productPageHeaderText) {
        cy.get(this.productsPageHeader).should('have.text', productPageHeaderText);
    }

    verifyProductsListDisplayed() {
        cy.get(this.products).should('be.visible');
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

    captureAndAddFirstTwoProducts(continueShopping) {
        const productPrices = [];
        const productNames = [];
        cy.get(this.productCards).each(($product, index) => {
            if (index < 2) {
                cy.wrap($product).within(() => {
                    cy.get(this.priceTag).invoke('text').then((price) => {
                        productPrices.push(price);
                    });
                    cy.get('.productinfo p').invoke('text').then((productName) => {
                        productNames.push(productName);
                    });
                    cy.get(this.addCartButton).click();
                })
            }
            if (index === 0) {
                cy.contains(continueShopping).click();
            }
            if (index === 1) {
                cy.get(this.viewCartLinkInPopup).click();
            }
        })
        return cy.then(() => {
            return {
                productPrices,
                productNames
            }
        })
    }

    openFirstProductDetails() {
        cy.get(this.productCards).first().within(() => {
            cy.get(this.viewCartButton).click();
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
            cy.get(this.brandLink).should('contain.text', this.brandSection);
            cy.get(`a[href*="/brand_products/${data.brandName}"]`).click();
            cy.contains(this.brandHeader, data.expectedHeader).should('be.visible');
        })
    }
}
