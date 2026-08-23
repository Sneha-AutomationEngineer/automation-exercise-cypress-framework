import HomePage from '../../../pages/homePage';
import ProductsPage from '../../../pages/productsPage';

const productsData = require('../../fixtures/productsData.json');

describe('Search Product', function () {

  let homePage;
  let productsPage;

  before(function () {
    homePage = new HomePage();
    productsPage = new ProductsPage();
  });

  beforeEach(function () {
    cy.visit('/');
    homePage.verifyHomePageDisplayed();
  });

  Object.values(productsData.searchProducts).forEach((searchTerm) => {
    it(`Product should be visible after searching for ${searchTerm}`, function () {
      homePage.openProductsPage();
      productsPage.verifyProductsPageDisplayed(productsData.productPageHeaderText);
      productsPage.searchProduct(searchTerm);
      productsPage.verifySearchedProductDisplayed(productsData.searchedProductsHeader);
      productsPage.verifyProductsListDisplayed();
      productsPage.verifySearchedProduct(searchTerm);
    });
  });
});