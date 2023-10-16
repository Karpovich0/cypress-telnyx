class contactUsPage {
	elements = {
		title: () => cy.get("h1"),
	};
}

module.exports = new contactUsPage();
