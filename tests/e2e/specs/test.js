// https://docs.cypress.io/api/introduction/api.html



describe('Register test', () => {
  it('Visit the register view', () => {
    cy.visit('/register');
    cy.contains('Create a new account');
  });
});