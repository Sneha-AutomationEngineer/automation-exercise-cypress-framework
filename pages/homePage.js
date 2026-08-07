export default class HomePage {

    loginLink = 'li a[href="/login"]';
    logoutLink = '[href="/logout"]';
    homePageVerify = '#slider-carousel';
    testCasePageLink = ' li a[href="/test_cases"]';
    productsPageLink = 'li a[href="/products"]';
    subscriptionHeader = '.single-widget h2';
    subscriptionEmailBox = '#susbscribe_email';
    subscriptionArrowButton = '#subscribe';
    subscriptionSuccessMessage = '.alert-success';
    shoppingCartLink = 'li a[href="/view_cart"]';
    deleteAccountLink = 'a[href="/delete_account"]';
    leftSidebar = '.left-sidebar';
    categoryLink = 'a[href*="/category_products/"]';
    categoryHeader = 'h2.title.text-center';
    categorySection = 'Category';
    recommendedSection = '.recommended_items';
    recommendedHeader = '.recommended_items .title';
    recommendedProduct = '.recommended_items .item.active .product-image-wrapper';
    productName = '.productinfo p';
    addToCartButton = 'a.add-to-cart';
    viewCartLinkInPopup = 'a[href="/view_cart"] u';
    scrollUpArrow = '#scrollUp';
    homePageBannerText = '#slider-carousel .item.active h2';

    openLoginPage() {
        cy.get(this.loginLink).click();
    }

    verifyLoggedInUser(user) {
        cy.contains("Logged in as " + user).should('be.visible');
    }

    clickLogout() {
        cy.get(this.logoutLink).click();
    }

    verifyHomePageDisplayed() {
        cy.get(this.homePageVerify).should('be.visible');
    }

    openTestCasesPage() {
        cy.get(this.testCasePageLink).click();
    }

    openProductsPage() {
        cy.get(this.productsPageLink).click();
    }

    scrollTo(scrollBottom) {
        cy.scrollTo(scrollBottom);
    }

    verifySubscriptionText(subscriptionHeader) {
        cy.get(this.subscriptionHeader).should('have.text', subscriptionHeader);
    }

    subscribeWithEmail(username) {
        cy.get(this.subscriptionEmailBox).type(username);
        cy.get(this.subscriptionArrowButton).click();
    }

    verifySubscriptionSuccessMessage(subscriptionSuccessMessage) {
        cy.get(this.subscriptionSuccessMessage).should('have.text', subscriptionSuccessMessage);
    }

    openCartPage() {
        cy.get(this.shoppingCartLink).click();
    }

    deleteAccount() {
        cy.get(this.deleteAccountLink).click();
    }

    verifyAccountDeletedAndClickContinue(accountDeletedMessage, continueAfterAccountDelete) {
        cy.contains(accountDeletedMessage).should('be.visible');
        cy.contains(continueAfterAccountDelete).click();
    }

    verifyCategoryNavigation() {
        const categoryData = [{ category: 'Women', subCategory: 'Dress', expectedHeader: 'Women - Dress Products' },
        { category: 'Men', subCategory: 'Tshirts', expectedHeader: 'Men - Tshirts Products' }
        ]
        cy.get(this.leftSidebar).should('contain.text', this.categorySection);
        categoryData.forEach((data) => {
            cy.get(`a[href="#${data.category}"]`).click();
            cy.contains(this.categoryLink, data.subCategory).click();
            cy.contains(this.categoryHeader, data.expectedHeader).should('be.visible');
        })
    }

    verifyRecommendedItemsHeader(recommendedItemsHeader) {
        cy.get(this.recommendedHeader).first().should('contain.text', recommendedItemsHeader).should('be.visible');
    }

    captureAndAddRecommendedProduct() {
        let productName;

        return cy.get(this.recommendedProduct)
            .first()
            .within(() => {
                cy.get(this.productName).invoke('text').then((name) => {
                    productName = name;
                });

                cy.get(this.addToCartButton).click();
            })
            .then(() => {
                cy.get(this.viewCartLinkInPopup).click();

                return cy.then(() => {
                    return {
                        productNames: [productName]
                    }
                });
            });
    }

    clickScrollUpArrow() {
        cy.get(this.scrollUpArrow).click();
    }

    verifyHomeBannerPage(homePageBannerText) {
        cy.contains(this.homePageBannerText, homePageBannerText)
            .should('be.visible');
    }
}