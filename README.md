# Cypress Automation Framework

A UI automation framework built using Cypress and JavaScript following the Page Object Model (POM) design pattern.

## Overview

This project is a UI automation framework built using Cypress and JavaScript following the Page Object Model (POM) design pattern.

It automates end-to-end test scenarios for the Automation Exercise website using reusable page objects, fixture-based test data management, and maintainable test design.

The framework is designed to demonstrate practical UI automation skills, clean code practices, and a scalable project structure similar to those used in real-world QA projects.

## Tech Stack

- JavaScript (ES6)
- Cypress
- Mocha
- Chai
- Page Object Model (POM)
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
├── cypress
│   ├── e2e
│   ├── fixtures
│   └── support
│
├── pages
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegistrationPage.js
│   ├── ContactUsPage.js
│   └── TestCasePage.js
│
├── package.json
├── package-lock.json
├── cypress.config.js
└── README.md
```

## Features Automated

- User Login
- User Logout
- New User Registration
- Existing User Registration Validation
- Contact Us Form
- Test Cases Page Navigation

## Framework Design

The framework follows the Page Object Model (POM) design pattern to improve code readability, reusability, and maintainability.

Key design principles:

- Reusable Page Objects with centralized locators
- Fixture-based test data management
- Separation of business actions and assertions
- Modular and maintainable test scripts
- Clear feature-based project organization

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

Use the following commands to execute the automation suite.

Open Cypress Test Runner

```bash
npx cypress open
```

Run in headless mode

```bash
npx cypress run
```

## Running a Specific Test

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## Reports

The framework currently uses the default Cypress Test Runner for execution and reporting.

Support for advanced reporting tools such as Mochawesome or Allure will be added in future enhancements.

## Future Enhancements

- GitHub Actions CI/CD integration
- Mochawesome or Allure reporting
- API automation
- Cross-browser execution
- Environment-based configuration
- Custom Cypress commands
- Data-driven test execution

## Version Control

The project follows a feature-branch Git workflow to keep development organized and maintainable.

- Feature branches for individual enhancements
- Pull Requests for code integration
- AI-assisted code reviews using CodeRabbit

## Author

**Sneha Upadhye**

Software Test Engineer

GitHub: https://github.com/Sneha-AutomationEngineer