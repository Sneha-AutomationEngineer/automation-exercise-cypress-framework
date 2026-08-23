describe('Search Product API', () => {

    it('should search products successfully', () => {

        cy.request({
            method: 'POST',
            url: '/api/searchProduct',
            form: true,
            body: { search_product: 'top' }
        }).then((response) => {

            expect(response.status).to.eq(200);
            const responseBody = JSON.parse(response.body);
            expect(responseBody.responseCode).to.eq(200);
            expect(responseBody).to.have.property('products');
            expect(responseBody.products).to.be.an('array');
            expect(responseBody.products.length).to.be.greaterThan(0);
        });
    });

    it('should check response when search_product parameter is missing', () => {
        cy.request({
            method: 'POST',
            url: '/api/searchProduct',
            form: true,
            failOnStatusCode: false
        }).then((response) => {

            expect(response.status).to.eq(200);
            const responseBody = JSON.parse(response.body);
            expect(responseBody.responseCode).to.eq(400);
            expect(responseBody.message).to.eq('Bad request, search_product parameter is missing in POST request.');
        });
    });
});