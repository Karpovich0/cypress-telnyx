const { defineConfig } = require("cypress");

module.exports = defineConfig({
	projectId: "ockhxj",
	defaultCommandTimeout: 500000,
	pageLoadTimeout: 500000,
	e2e: {
		//baseURL is commented because some tests require to check links with subdomains, like https://developers.telnyx.com/. With baseURL it cause an error like "browser didn't shot 'load' event"
		//baseUrl: "https://telnyx.com",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		viewportWidth: 1440,
		viewportHeight: 900,
	},
});
