class registrationPage {
	elements = {
		email: () => cy.get("#email"),
		firstName: () => cy.get("#first_name"),
		lastName: () => cy.get("#last_name"),
		password: () => cy.get("#password"),
		termsAndConditions: () => cy.get("#terms_and_conditions"),
		submitButton: () => cy.get('button[type="submit"]').first(),
		error: () => cy.get('div[class$="type-error"]'),
	};

	fillForm(email, firstName, lastName, password) {
		this.elements.email().type(email);
		this.elements.firstName().type(firstName);
		this.elements.lastName().type(lastName);
		this.elements.password().type(password);
	}
	acceptTermsAndConditions() {
		this.elements.termsAndConditions().click();
	}
	submitForm() {
		this.elements.submitButton().click();
	}
}

module.exports = new registrationPage();
