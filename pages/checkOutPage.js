export default class CheckOutPage {

    deliveryAddressBox = '.address.item.box';
    billingAddressBox ='.address.alternate_item.box';
    addressBoxHeader ='h3.page-subheading';
    addressBoxFirstNameLastName = '.address_firstname.address_lastname';
    address1Address2 = '.address_address1.address_address2';
    addressCityStatePostcode = '.address_city.address_state_name.address_postcode';
    addressCountryName = '.address_country_name';
    addressPhone ='.address_phone';

    verifyAddresses(userData) {
        const addresses = [{ selector: this.deliveryAddressBox, heading: "Your delivery address" },
        { selector: this.billingAddressBox, heading: "Your billing address" }];
        addresses.forEach((address) => {
            cy.get(address.selector).within(() => {
                cy.get(this.addressBoxHeader).should('have.text', address.heading);
                cy.get(this.addressBoxFirstNameLastName).should('contain.text', userData.firstName).should('contain.text', userData.lastName);
                cy.get(this.address1Address2).should('contain.text', userData.address1).should('contain.text', userData.address2)
                cy.get(this.addressCityStatePostcode).should('contain.text', userData.city).should('contain.text', userData.state).should('contain.text', userData.zipcode);
                cy.get(this.addressCountryName).should('contain.text', userData.country)
                cy.get(this.addressPhone).should('contain.text', userData.mobilenumber);
            })
        })
    }
}