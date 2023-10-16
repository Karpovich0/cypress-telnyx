import homePage from "./../pages/homePage";
import registrationPage from "./../pages/registrationPage";
import productsPage from "./../pages/productsPage";
import contactUsPage from "./../pages/contactUsPage";
import solutionsPage from "./../pages/solutionsPage";
import pricingPage from "./../pages/pricingPage";
import loginPage from "./../pages/loginPage";
import telnyx from "./../fixtures/telnyx.json";
import user from "./../fixtures/user.json";
describe("Telnyx", () => {
	beforeEach(() => {
		cy.fixture("telnyx").as("telnyx");
		cy.fixture("user").as("user");
	});

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
		telnyx;
		cy.get("@telnyx").then((data) => {
			cy.url().should("eq", data.productsVoiceApiLink);
			cy.get("h1").should("have.text", data.productsVoiceApiTitle);
		});
	});

	it("Footer Navigation Functionality On Desktop", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.footer().scrollIntoView();
		homePage.elements.footerGlobalCoverage().click();
		cy.get("@telnyx").then((data) => {
			cy.url().should("eq", data.globalCoverageLink);
			cy.get("h1 span").should("have.text", data.globalCoverageTitle);
		});
	});

	it("Registration using invalid data", () => {
		cy.visitAndAcceptCookies("/");
		homePage.clickOnSignup();
		cy.get("@telnyx").then((data) => {
			cy.url().should("eq", data.signUpLink);
		});
		cy.get("@user").then((data) => {
			registrationPage.fillForm(data.invalidEmail, data.firstName, data.secondName, data.password);
		});
		registrationPage.acceptTermsAndConditions();
		registrationPage.submitForm();
		registrationPage.elements.error().eq(0).should("be.visible");
		registrationPage.elements.error().eq(1).should("be.visible");
	});

	it("Open contact us form from products page", () => {
		cy.visitAndAcceptCookies("/products");
		productsPage.elements.contactUs().eq(2).click();
		cy.get("@telnyx").then((data) => {
			cy.url().should("eq", data.contactUsLink);
			contactUsPage.elements.title().should("have.text", data.contactUsTitle);
		});
	});
	it("Scroll down functionality on Solutions' page", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.solutionsLink().eq(0).click();
		cy.get("@telnyx").then((data) => {
			cy.url().should("eq", data.solutionsLink);
		});
		solutionsPage.elements.useCasesLink().click();
		solutionsPage.elements.useCasesTitle().should("be.visible");
	});
	it("Check adaptivity on viewport width change", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.headerBurger().should("not.be.visible");
		Cypress.config("baseUrl", null);
		cy.viewport("ipad-2");
		homePage.elements.headerBurger().should("be.visible");
	});
	it("Burger functionality", () => {
		cy.visitAndAcceptCookies("/");
		// IPhone 12 pro's viewport
		cy.viewport("iphone-x");
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
		cy.get("@telnyx").then((data) => {
			cy.url().should("include", data.developersLink);
		});
	});
	it("Login with invalid data", () => {
		cy.visitAndAcceptCookies("/");
		homePage.elements.loginLink().should("be.visible").invoke("attr", "target", "_self").click();
		cy.get("@telnyx").then((data) => {
			cy.url().should("include", data.portalLink);
		});
		cy.get("@user").then((data) => {
			loginPage.fillForm(data.validEmail, data.password);
		});
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
