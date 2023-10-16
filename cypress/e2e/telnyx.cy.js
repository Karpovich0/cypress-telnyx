import homePage from "./../pages/homePage";
import registrationPage from "./../pages/registrationPage";
import productsPage from "./../pages/productsPage";
import contactUsPage from "./../pages/contactUsPage";
import solutionsPage from "./../pages/solutionsPage";
import pricingPage from "./../pages/pricingPage";
import loginPage from "./../pages/loginPage";
describe("Telnyx", () => {
	it("Homepage Validation", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.logo().should("be.visible");
		homePage.elements.headerNavigation().should("be.visible");
	});

	it("Header Navigation Functionality On Desktop", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.headerNavigation().within(() => {
			cy.get("button:first-of-type").click();
		});
		homePage.elements.productsVoiceApi().should("be.visible").click();
		cy.url().should("eq", "https://telnyx.com/products/voice-api");
		cy.get("h1").should("have.text", "Voice API");
	});

	it("Footer Navigation Functionality On Desktop", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.footer().scrollIntoView();
		homePage.elements.footerGlobalCoverage().click();
		cy.url().should("eq", "https://telnyx.com/global-coverage");
		cy.get("h1 span").should("have.text", "Global coverage");
	});

	it("Registration using invalid data", () => {
		cy.visitAndAcceptCookies("/");
		homePage.clickOnSignup();
		cy.url().should("eq", "https://telnyx.com/sign-up");
		registrationPage.fillForm("notAllowedString", "Tester", "Testov", "CorrectPasswrod123.?");
		registrationPage.acceptTermsAndConditions();
		registrationPage.submitForm();
		registrationPage.elements.error().eq(0).should("be.visible");
		registrationPage.elements.error().eq(1).should("be.visible");
	});

	it("Open contact us form from products page", () => {
		cy.visitAndAcceptCookies("/products");
		productsPage.elements.contactUs().eq(2).click();
		cy.url().should("eq", "https://telnyx.com/contact-us");
		contactUsPage.elements.title().should("have.text", "Talk to an expert");
	});
	it("Scroll down functionality on Solutions' page", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.solutionsLink().eq(0).click();
		cy.url().should("eq", "https://telnyx.com/solutions");
		solutionsPage.elements.useCasesLink().click();
		solutionsPage.elements.useCasesTitle().should("be.visible");
	});
	it("Check adaptivity on viewport width change", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.headerBurger().should("not.be.visible");
		cy.viewport(1439, 900);
		homePage.elements.headerBurger().should("be.visible");
	});
	it("Burger functionality", () => {
		cy.visitAndAcceptCookies("/");
		// IPhone 12 pro's viewport
		cy.viewport(390, 844);
		homePage.elements.headerBurger().should("be.visible").click();
		homePage.elements
			.headerNavigationMobile()
			.should("be.visible")
			.within(() => {
				cy.get("button[type=button]").eq(4).click();
			});
		homePage.elements
			.dropDown()
			.should("be.visible")
			.within(() => {
				cy.get('[href="https://developers.telnyx.com"]').invoke("attr", "target", "_self").click();
			});
		cy.url().should("include", "https://developers.telnyx.com");
	});
	it("Login with invalid data", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.loginLink().should("be.visible").invoke("attr", "target", "_self").click();
		cy.url().should("include", "https://portal.telnyx.com/");
		loginPage.fillForm("unExistingEmail@gmail.com", "wrongPassword12.?");
		loginPage.submitForm();
		loginPage.elements.errorMessage().should("exist");
	});
	it("FAQ accordion functionality of Pricing page", () => {
		cy.visitAndAcceptCookies("/pricing/call-control");
		pricingPage.elements
			.accordionItem("closed")
			.eq(0)
			.click()
			.within(() => {
				pricingPage.elements.accordionItem("open").should("exist");
			});
	});
});
