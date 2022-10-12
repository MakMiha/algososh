import {
  DEFAULT_COLOR,
  CHANGING_COLOR,
  SHORT_DELAY_IN_MS
} from './utils/constants.cy';

export const addItem = (value, index) => {
  cy.get('input').type(value)
  cy.get('button').contains('Добавить').click()
  cy.get('[class^=circle_circle]').eq(index)
    .should('have.css', 'border', CHANGING_COLOR)
    .contains(value)
  cy.wait(SHORT_DELAY_IN_MS)
  cy.get('[class^=circle_circle]').eq(index)
    .should('have.css', 'border', DEFAULT_COLOR)
    .contains(value)
}

describe('Страница работает корректно', () => {
  before(() => {
    cy.visit('http://localhost:3000/queue');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').clear()
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Удалить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
    cy.get('[class^=circle_circle]').each((element) => {
      expect(element).to.have.text('')
    });
  });
  

  it('Добавление выполняется корректно', () => {
    addItem('1', 0);
    cy.get('[class^=circle_circle]').prev().should('have.text', 'head');
    cy.get('[class^=circle_circle]').eq(0).next().next().should('have.text', 'tail');
    addItem('2', 1);
    cy.get('[class^=circle_circle]').prev().should('have.text', 'head');
    cy.get('[class^=circle_circle]').eq(1).next().next().should('have.text', 'tail');
    addItem('3', 2);
    cy.get('[class^=circle_circle]').prev().should('have.text', 'head');
    cy.get('[class^=circle_circle]').eq(2).next().next().should('have.text', 'tail');
  });

  it('Удаление выполняется корректно', () => {
    cy.contains('Удалить').click();
    cy.get('[class^=circle_circle]').first()
      .should('not.have.text');
    cy.get('[class^=circle_circle]').eq(1).prev()
      .should('have.text', 'head');
    cy.contains('Удалить').click();
    cy.get('[class^=circle_circle]').eq(1)
      .should('not.have.text');
    cy.get('[class^=circle_circle]').eq(2).prev()
      .should('have.text', 'head');
  });

  it('Очередь очищается корректно', () => {
    cy.get('button').contains('Очистить').click();
    cy.get('[class^=circle_circle]').each((element) => {
      expect(element).to.have.text('')
    });
  })
});