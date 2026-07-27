export default class ProductPage{

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

    verifyProductsPageDisplayed(productPageHeaderText){
        cy.get(this.productsPageHeader).should('have.text', productPageHeaderText);
    }

    verifyProductsListDisplayed(){
        cy.get(this.products).should('be.visible');
        cy.get(this.productCards).should('have.length.greaterThan', 0);
    }

    openFirstProductDetails(viewProductText){
        cy.get(this.productCards).first().find('a').contains(viewProductText).click();
    }

    verifyProductDetailsDisplayed(){
        cy.get(this.productInformation).within(() => {
        cy.get(this.productName).should('be.visible').invoke('text').should('not.be.empty');;
        cy.contains(this.productInformationText, 'Category').should('be.visible');
        cy.get(this.productPrice).should('be.visible').invoke('text').should('not.be.empty');;
        cy.contains(this.productInformationText, 'Availability').should('be.visible');
        cy.contains(this.productInformationText, 'Condition').should('be.visible');  
        cy.contains(this.productInformationText, 'Brand').should('be.visible');
        })
    }

    searchProduct(productName){
        cy.get(this.searchBar).type(productName);
        cy.get(this.searchIconButton).click();
    }

    verifySearchedProductDisplayed(productsPageHeader){
        cy.get(this.productsPageHeader).should('contain.text', productsPageHeader);
    }

    verifySearchedProduct(productName){
        cy.get(this.searchedProductDetail).should('contain.text', productName);
    }
}