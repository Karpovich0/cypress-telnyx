class pricingPage {
	elements = {
		accordionItem: (state) => cy.get(`div[data-state=${state}]`),
	};
}

module.exports = new pricingPage();
