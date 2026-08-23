describe('Brands API', () => {

    it('should get all brands successfully', () => {
        cy.request({
            method: 'GET',
            url: '/api/brandsList'
        }).then((response) => {
            expect(response.status).to.eq(200);
            const responseBody = JSON.parse(response.body);
            expect(responseBody.responseCode).to.eq(200);
            expect(responseBody).to.have.property('brands');
            expect(responseBody.brands).to.be.an('array');
            expect(responseBody.brands.length).to.be.greaterThan(0);
        });
    });

    it('should verify PUT request is not supported', () => {
        cy.request({
            method: 'PUT',
            url: '/api/brandsList',
            failOnStatusCode: false
        }).then((response) => {
            const responseBody = JSON.parse(response.body);
            expect(responseBody.responseCode).to.eq(405);
            expect(responseBody.message).to.eq('This request method is not supported.');
        });
    });
});