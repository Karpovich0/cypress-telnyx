class homePage {
	elements = {
		headerNavigation: () => cy.get("header nav:not([id])"),
		headerNavigationMobile: () => cy.get("#navigation"),
		headerBurger: () => cy.get('[aria-controls="navigation"]'),
		logo: () => cy.get('header [href="/"]'),
		productsVoiceApi: () => cy.get('[href$="/products/voice-api"]').first(),
		footer: () => cy.get("footer"),
		footerGlobalCoverage: () => cy.get('footer a[href="/global-coverage"]'),
		registrationLink: () => cy.get("#header-sign-up"),
		solutionsLink: () => cy.get('[href="/solutions"]'),
		loginLink: () => cy.get('[href="https://portal.telnyx.com/"]').eq(0),
		dropDown: () => cy.get('div[data-state="open"]'),
	};

	clickOnSignup() {
		this.elements.registrationLink().click();
	}
}

module.exports = new homePage();
