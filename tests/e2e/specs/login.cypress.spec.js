describe('Login test', () => {
    before(() => {
        cy.visit('#/');
    });
    it('Test title', () => {
        cy.contains('Login to Agileffy');
    });
    it('Username empty test', () => {
        cy.get('[test-input-username]')
            .click()
            .blur();
        cy.contains('This is required!');
    });
    it('Password empty test', () => {
        cy.get('[test-input-password]')
            .click()
            .blur();
        cy.contains('This is required!');
    });
    it('Password invisible test', () => {
        cy.get('[test-input-password]')
            .type('passwordtest')
            .should('have.attr', 'type', 'password');
    });
    it('Login button state', () => {
        cy.get('[test-btn-submit]').should('be.disabled');
    });
    it('Register button state', () => {
        cy.get('[test-input-username]')
            .clear()
            .type('HuZhifeng')
            .blur();
        cy.get('[test-input-password]')
            .clear()
            .type('HuZhifeng');
        cy.get('[test-btn-submit]').should('not.be.disabled');
    });
    it('Test unsuccessful login', () => {
        cy.server();
        cy.route('POST', '/api/login', 'Username does not exist');
        cy.get('[test-btn-submit]').click();
        cy.contains('Username does not exist');
        cy.url().should('be', Cypress.config().baseUrl+'#/');
    });
    it('Test login with error', () => {
        cy.server({ force404: true });
        cy.get('[test-btn-submit]').click();
        cy.contains('ERROR:404 Not Found');
        cy.url().should('be', Cypress.config().baseUrl+'#/');
    });
    it('Test successful login', () => {
        cy.server();
        cy.route('POST', '/api/login', 'OK');
        cy.get('[test-btn-submit]').click();
        cy.url().should('include', '/write');
    });
    it('Goto Register Page test', () => {
        cy.visit('#/');
        cy.get('[test-btn-register]').click();
        cy.url().should('include', '/register');
    });
});
