describe('Products API', () => {

    it('should get all products successfully', () => {

        cy.request({
            method: 'GET',
            url: '/api/productsList'
        }).then((response) => {
            expect(response.status).to.eq(200);
            const responseBody = JSON.parse(response.body);
            expect(responseBody.responseCode).to.eq(200);
            expect(responseBody).to.have.property('products');
            expect(responseBody.products).to.be.an('array');
            expect(responseBody.products.length).to.be.greaterThan(0);
        });
    });

    it('should verify POST request is not supported', () => {
        cy.request({
            method: 'POST',
            url: '/api/productsList',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            const responseBody = JSON.parse(response.body);
            expect(responseBody.responseCode).to.eq(405);
            expect(responseBody.message).to.eq('This request method is not supported.');
        });
    });
});