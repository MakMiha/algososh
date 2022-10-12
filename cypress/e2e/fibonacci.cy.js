const data = [0, 1, 1, 2, 3, 5, 8];

describe('Страница работает корректно', () => {
  before(() => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  });
    
  it('Числа выводятся корректно', () => {
    cy.get('input').type('5');
    cy.get('button').contains('Рассчитать').click();

    cy.get('[class^=circle_circle]').each((symbol, index) => {
      expect(symbol).to.have.text(data[index])
    });
  });
});