class productsPage {
	elements = {
		contactUs: () => cy.get('[href="/contact-us"]'),
	};
}

module.exports = new productsPage();
