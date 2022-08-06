const { defineConfig } = require('cypress')
const clipboardy = require('clipboardy')

module.exports = defineConfig({
  e2e: {
    // baseUrl, etc
    baseUrl: 'https://github.com',
    supportFile: false,
    fixturesFolder: false,
    viewportHeight: 1000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
      on('task', {
        readClipboard: clipboardy.readSync,
      })
    },
  },
})
