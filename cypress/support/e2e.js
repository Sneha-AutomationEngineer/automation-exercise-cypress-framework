// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-mochawesome-reporter/register';
import './commands';

// Ignore only known third-party/site noise from automationexercise.com
Cypress.on('uncaught:exception', (err) => {
    const ignoredErrors = [
        'Bootstrap requires jQuery',
        'Script error.',
        'ResizeObserver loop limit exceeded',
        'ResizeObserver loop completed with undelivered notifications',
    ];

    if (ignoredErrors.some((message) => err.message.includes(message))) {
        return false;
    }

    return true;
});

// Prevent third-party ads/analytics from blocking the window `load` event
beforeEach(() => {
    cy.intercept('**/adsbygoogle.js*', { statusCode: 204, body: '' });
    cy.intercept('**/beacon.min.js*', { statusCode: 204, body: '' });
    cy.intercept('**/gtag/**', { statusCode: 204, body: '' });
});
