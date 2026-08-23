describe('Get User Detail By Email API', () => {

    it('should get user details by email', () => {

        cy.fixture('loginData').then((data) => {

            cy.request({
                method: 'GET',
                url: '/api/getUserDetailByEmail',
                qs: {
                    email: data.username
                }
            }).then((response) => {

                expect(response.status).to.eq(200);
                const responseBody = JSON.parse(response.body);
                expect(responseBody.responseCode).to.eq(200);
                expect(responseBody.user).to.have.property('email');
            });
        });
    });
});