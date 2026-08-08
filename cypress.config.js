const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: true,
  },

  e2e: {
    baseUrl: "https://automationexercise.com/",
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 15000,
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
    blockHosts: [
      "*.googlesyndication.com",
      "*.doubleclick.net",
      "pagead2.googlesyndication.com",
      "www.google-analytics.com",
      "*.googletagmanager.com",
      "*.googleadservices.com",
      "static.cloudflareinsights.com",
      "*.facebook.net",
      "*.hotjar.com",
    ],

    setupNodeEvents(on, config) {

      require("cypress-mochawesome-reporter/plugin")(on);

      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.family === "chromium") {
          launchOptions.args.push("--disable-gpu");
          launchOptions.args.push("--disable-dev-shm-usage");
          launchOptions.args.push("--disable-background-networking");
          launchOptions.args.push("--no-sandbox");
        }
        return launchOptions;
      });

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
