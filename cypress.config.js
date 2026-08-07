const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    baseUrl: "https://automationexercise.com/",

    setupNodeEvents(on, config) {

      require("cypress-mochawesome-reporter/plugin")(on);

      on("task", {
        deleteFile(filePath) {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          return null;
        },
      });

      return config;
    },
  },
});