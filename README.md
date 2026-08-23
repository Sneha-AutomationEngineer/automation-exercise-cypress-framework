![Cypress](https://img.shields.io/badge/Cypress-14.5.4-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Mocha](https://img.shields.io/badge/Mocha-Testing-brown)
![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)

# Cypress Automation Framework

> UI and API automation framework for Automation Exercise built using Cypress and JavaScript following the Page Object Model (POM).

## Overview

This project is a UI and API automation framework built using Cypress and JavaScript following the Page Object Model (POM) design pattern.

It automates end-to-end UI and API test scenarios for the Automation Exercise website using reusable page objects, fixture-based test data management, and maintainable test design.

The framework is designed to demonstrate practical UI automation, API automation, clean code practices, and a scalable project structure similar to those used in real-world QA projects.

## Tech Stack

- JavaScript (ES6)
- Cypress
- Cypress API Testing (`cy.request`)
- Mocha
- Chai
- Page Object Model (POM)
- cypress-mochawesome-reporter
- GitHub Actions (CI/CD)
- Git
- GitHub

## Application Under Test

**Automation Exercise**

https://automationexercise.com/

## Project Structure

The project is organized using a feature-based structure to improve readability and maintainability.

```text
automation-exercise-cypress-framework
│
├── .github
│   └── workflows
│       └── cypress.yml
│
├── cypress
│   ├── e2e
│   │   ├── api
│   │   │   ├── productsApi.cy.js
│   │   │   ├── brandsApi.cy.js
│   │   │   ├── searchProductApi.cy.js
│   │   │   ├── verifyLoginApi.cy.js
│   │   │   ├── createAccountApi.cy.js
│   │   │   └── getUserDetailByEmailApi.cy.js
│   │   └── ui
│   │       ├── login.cy.js
│   │       ├── logout.cy.js
│   │       ├── searchProducts.cy.js
│   │       └── ...
│   ├── fixtures
│   ├── screenshots
│   └── support
│
├── pages
│   ├── cartPage.js
│   ├── checkOutPage.js
│   ├── contactUSPage.js
│   ├── homePage.js
│   ├── loginPage.js
│   ├── paymentPage.js
│   ├── productsPage.js
│   ├── registrationPage.js
│   └── testCasePage.js
│
├── assets
│   └── test-execution.png
│
├── utils
├── package.json
├── package-lock.json
├── cypress.config.js
├── .gitignore
└── README.md
```

## Test Coverage

### UI Test Coverage

- Home Page
- User Registration
- Login & Logout
- Contact Us
- Test Cases
- Products
- Product Details
- Search Products
- Subscription
- Add to Cart
- Remove Products from Cart
- Cart Persistence
- Product Quantity
- Recommended Products
- Brand & Category Navigation
- Checkout
- Address Verification
- Place Order
- Payment
- Download Invoice
- Scroll Up / Scroll Down

### API Test Coverage

API automation covers the Automation Exercise API list (APIs 1–14):

- Products API
- Brands API
- Search Product API
- Verify Login API
- Create Account API
- Update Account API
- Delete Account API
- Get User Detail By Email API

Positive and negative scenarios are covered with HTTP status, `responseCode`, message, and response body validations.

## Framework Design

The framework follows the Page Object Model (POM) design pattern to improve code readability, reusability, and maintainability.

Key design principles:

- Reusable Page Objects with centralized locators
- Fixture-based test data management
- Separation of business actions and assertions
- Modular and maintainable test scripts
- Clear feature-based project organization
- API request and response validation

## Framework Highlights

- Page Object Model (POM)
- Reusable page methods
- Centralized locators
- Fixture-based test data
- Reusable assertions
- Dynamic test data generation
- Custom Cypress Commands (`cy.loginAs`)
- Data-driven test execution
- End-to-end UI automation workflows
- API automation with Cypress
- Positive and negative API testing
- Response status and body validation
- Cross-browser execution scripts (Edge / Firefox)
- Environment-based `BASE_URL` configuration
- HTML reporting with mochawesome
- GitHub Actions CI with parallel test execution
- Clean project structure

## Framework Statistics

- UI Spec Files: 23
- UI Test Cases: 32
- API Spec Files: 6
- API Test Cases: 14
- Page Objects: 9
- Fixture Files: 8
- API Coverage: Automation Exercise APIs 1–14
- Framework Pattern: Page Object Model (POM)

## Prerequisites

Before running the project, ensure the following are installed:

- Node.js
- npm
- Git

## Installation

Clone the repository

```bash
git clone https://github.com/Sneha-AutomationEngineer/automation-exercise-cypress-framework.git
```

Install dependencies

```bash
npm install
```

## Running the Tests

### Open Cypress Test Runner

```bash
npm run cy:open
```

### Run All Tests (Regression)

```bash
npm test
```

### Run Smoke Tests

```bash
npm run test:smoke
```

### Run UI Tests

```bash
npm run test:ui
```

### Run API Tests

```bash
npm run test:api
```

### Run a Specific UI Test

```bash
npx cypress run --spec "cypress/e2e/ui/login.cy.js"
```

### Run a Specific API Test

```bash
npx cypress run --spec "cypress/e2e/api/createAccountApi.cy.js"
```

### Cross-browser Smoke / Regression

```bash
npm run cy:smoke:edge
npm run cy:smoke:firefox
npm run cy:regression:edge
npm run cy:regression:firefox
```

## Test Execution

### UI Test Execution

The UI automation suite has been successfully executed in headless mode.

- Spec Files: 23
- Test Cases: 32
- Passing: 32
- Failing: 0

### API Test Execution

The API automation suite has been successfully executed in headless mode.

- Spec Files: 6
- Test Cases: 14
- APIs Covered: 1–14
- Passing: 14
- Failing: 0

### Execution Result

![Test Execution](assets/test-execution.png)

## Reports

The framework uses **cypress-mochawesome-reporter** to generate HTML execution reports.

After running the test suite, the report is available at:

```text
cypress/reports/index.html
```

The report includes:

- Test execution summary
- Passed and failed test cases
- Execution duration
- Failure screenshots (when applicable)

## Version Control

The project follows a feature-branch Git workflow to keep development organized and maintainable.

- Feature branches for individual enhancements
- Pull Requests for code integration
- AI-assisted code reviews using CodeRabbit

## Author

**Sneha Upadhye**

Software Test Engineer

GitHub: [Sneha-AutomationEngineer](https://github.com/Sneha-AutomationEngineer)

LinkedIn: [Sneha Upadhye](https://www.linkedin.com/in/sneha-upadhye-224297226/)
