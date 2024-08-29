const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  blockHosts: [ "www.googletagmanager.com", "analytics.google.com", "www.google-analytics.com" ],
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    specPattern: 'cypress/integration/examples/*.js',
    watchForFileChanges: false,
    chromeWebSecurity: false,
    blockHosts: "https://events.backtrace.io"
  },
 
});
