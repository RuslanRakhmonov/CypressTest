const { defineConfig } = require("cypress");

module.exports = defineConfig({
  blockHosts: [ "www.googletagmanager.com", "analytics.google.com", "www.google-analytics.com" ],
  env: {
    url: "https://www.saucedemo.com/"
  },
  e2e: {
    specPattern: 'cypress/integration/examples/*.js',
    watchForFileChanges: false,
    chromeWebSecurity: false,
    blockHosts: "https://events.backtrace.io"
  },
 
});
