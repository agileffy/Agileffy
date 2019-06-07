// https://docs.cypress.io/api/introduction/api.html

describe('Register test', () => {
    before(() => {
        cy.visit('#/register/');
    });
    it('Test title', () => {
        cy.contains('Create a new account');
    });
    it('Username empty test', () => {
        cy.get('[test-input-username]')
            .click()
            .blur();
        cy.contains('This is required!');
    });
    it('Username too short test', () => {
        cy.get('[test-input-username]')
            .click()
            .type('a')
            .blur();
        cy.contains('Min 6 characters required!');
    });
    it('Username too long test', () => {
        cy.get('[test-input-username]')
            .click()
            .clear()
            .type('abcdefghijklmnopqrstuvwxyz1234567890', {
                delay: 0,
                timeout: 3000,
            });
        cy.contains('Max 30 characters required!');
    });
    it('Username counter test', () => {
        cy.get('[test-input-username]')
            .click()
            .clear()
            .type('abcdefghijklmnopqrstuvwxyz')
            .blur();
        cy.contains('26');
    });
    it('Username ilegal test', () => {
        cy.get('[test-input-username]')
            .click()
            .clear()
            .type('23333333333333')
            .blur();
        cy.contains(
            'Username should start with a letter, following with letters,digits and special characters(._-)',
        );
    });
    it('Username ilegal test', () => {
        cy.get('[test-input-username]')
            .click()
            .clear()
            .type('zzzzzzzzzzz//////')
            .blur();
        cy.contains(
            'Username should start with a letter, following with letters,digits and special characters(._-)',
        );
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
        cy.get('[test-input-passwordrepeat]')
            .type('passwordtest')
            .should('have.attr', 'type', 'password');
    });
    it('Password visible test', () => {
        cy.get('.v-input__icon--append')
            .first()
            .click();
        cy.get('[test-input-password]')
            .clear()
            .type('passwordtest')
            .should('have.attr', 'type', 'text');
        cy.get('[test-input-passwordrepeat]')
            .clear()
            .type('passwordtest')
            .should('have.attr', 'type', 'text');
    });
    it('Password ilegal test', () => {
        cy.get('[test-input-password]')
            .clear()
            .type('pass');
        cy.contains(
            'Password should contains at least two of these four types of characters: lowercase letters,                         uppercase letters, digits, special characters(.,_!@#$%^&*`~()-+=)                         and should have a length between 8 and 30.',
        );
    });
    it('Password ilegal test', () => {
        cy.get('[test-input-password]')
            .clear()
            .type('passwordtestpasswordtestpasswordtest');
        cy.contains(
            'Password should contains at least two of these four types of characters: lowercase letters,                         uppercase letters, digits, special characters(.,_!@#$%^&*`~()-+=)                         and should have a length between 8 and 30.',
        );
    });
    it('Password ilegal test', () => {
        cy.get('[test-input-password]')
            .clear()
            .type('passwordtest');
        cy.contains(
            'Password should contains at least two of these four types of characters: lowercase letters,                         uppercase letters, digits, special characters(.,_!@#$%^&*`~()-+=)                         and should have a length between 8 and 30.',
        );
    });
    it('Password ilegal test', () => {
        cy.get('[test-input-password]')
            .clear()
            .type('PASSWORDTEST');
        cy.contains(
            'Password should contains at least two of these four types of characters: lowercase letters,                         uppercase letters, digits, special characters(.,_!@#$%^&*`~()-+=)                         and should have a length between 8 and 30.',
        );
    });
    it('Password ilegal test', () => {
        cy.get('[test-input-password]')
            .clear()
            .type('123456789');
        cy.contains(
            'Password should contains at least two of these four types of characters: lowercase letters,                         uppercase letters, digits, special characters(.,_!@#$%^&*`~()-+=)                         and should have a length between 8 and 30.',
        );
    });
    it('Password ilegal test', () => {
        cy.get('[test-input-password]')
            .clear()
            .type('.,_!@#$%^&*`~()');
        cy.contains(
            'Password should contains at least two of these four types of characters: lowercase letters,                         uppercase letters, digits, special characters(.,_!@#$%^&*`~()-+=)                         and should have a length between 8 and 30.',
        );
    });
    it('Password invisible test', () => {
        cy.get('.v-input__icon--append')
            .last()
            .click();
        cy.get('[test-input-password]')
            .clear()
            .type('passwordtest')
            .should('have.attr', 'type', 'password');
        cy.get('[test-input-passwordrepeat]')
            .clear()
            .type('passwordtest')
            .should('have.attr', 'type', 'password');
    });
    it('Password repeat test', () => {
        cy.get('[test-input-password]')
            .clear()
            .type('passwordtest');
        cy.get('[test-input-passwordrepeat]')
            .clear()
            .type('passwordtestnot');
        cy.contains('Password does not match!');
    });
    it('Email empty test', () => {
        cy.get('[test-input-email]')
            .click()
            .blur();
        cy.contains('This is required!');
    });
    it('Email ilegal test', () => {
        cy.get('[test-input-email]')
            .click()
            .type('zzzzzzzzzzzzz@zzzz/.x.')
            .blur();
        cy.contains('Invalid e-mail.');
    });
    it('Checkbox empty test', () => {
        cy.get('[test-checkbox-termagree]')
            .get('.v-input--selection-controls__ripple')
            .click()
            .click();
        cy.contains('This is required!');
    });
    it('Register button state',()=>{
      cy.get('[test-btn-submit]').should('be.disabled');
    });
    it('Register button state',()=>{
      cy.get('[test-input-username]')
            .clear()
            .type('HuZhifeng')
            .blur();
      cy.get('[test-input-password]')
            .clear()
            .type('HuZhifeng');
      cy.get('[test-input-passwordrepeat]')
            .clear()
            .type('HuZhifeng');
      cy.get('[test-input-email]')
            .clear()
            .type('HuZhifeng@ichn.ac.cn');
      cy.get('[test-checkbox-termagree]')
            .get('.v-input--selection-controls__ripple')
            .click();
      cy.get('[test-btn-submit]').should('not.be.disabled');
    });
    it('Test unsuccessful register', () => {
        cy.server();
        cy.route('POST', '/api/register', 'Username has existed');
        cy.get('[test-btn-submit]').click();
        cy.contains('Username has existed');
        cy.url().should('include', '/register');
    });
    it('Test register with error', () => {
        cy.server({ force404: true });
        cy.get('[test-btn-submit]').click();
        cy.contains('ERROR:404 Not Found');
        cy.url().should('include', '/register');
    });
    it('Test successful register', () => {
        cy.server();
        cy.route('POST', '/api/register', 'OK');
        cy.get('[test-btn-submit]').click();
        cy.url().should('include', '/write');
    });
    it('Goto login Page test', () => {
        cy.visit('#/register');
        cy.get('[test-btn-cancel]').click();
        cy.url().should('be', Cypress.config().baseUrl+'#/');
    });
});
