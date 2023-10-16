class solutionsPage {
	elements = {
		useCasesLink: () => cy.get('[href="#use-cases"]'),
		useCasesTitle: () => cy.get("#use-cases strong"),
	};
}

module.exports = new solutionsPage();
