describe('Роутинг', () => {
  it('recursion page', () => {
    cy.visit(`http://localhost:3000/recursion`);
  });

  it('fibonacci page', () => {
    cy.visit(`http://localhost:3000/fibonacci`);
  });

  it('sorting page', () => {
    cy.visit(`http://localhost:3000/sorting`);
  });

  it('stack page', () => {
    cy.visit(`http://localhost:3000/stack`);
  });

  it('queue page', () => {
    cy.visit(`http://localhost:3000/queue`);
  });

  it('list page', () => {
    cy.visit(`http://localhost:3000/list`);
  });
});