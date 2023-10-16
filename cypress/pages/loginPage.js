class loginPage {
	elements = {
		email: () => cy.get('[name="email"]').eq(0),
		password: () => cy.get('[name="password"]'),
		submitButton: () => cy.get('[type="submit"]').eq(1),
		errorMessage: () => cy.get('div[data-testid="login.signin.message"]'),
	};

	fillForm(email, password) {
		this.elements.email().type(email);
		this.elements.password().type(password);
	}

	submitForm() {
		this.elements.submitButton().click();
	}
}

module.exports = new loginPage();
