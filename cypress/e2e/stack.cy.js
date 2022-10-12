import {
  DEFAULT_COLOR,
  CHANGING_COLOR,
  SHORT_DELAY_IN_MS
} from './utils/constants.cy';

const push = (value) => {
  cy.get('input').type(value)
  cy.get('button').contains('Добавить').click()
  cy.get('[class^=circle_circle]').last()
    .should('have.css', 'border', CHANGING_COLOR)
    .contains(value)
  cy.wait(SHORT_DELAY_IN_MS)
  cy.get('[class^=circle_circle]').last()
    .should('have.css', 'border', DEFAULT_COLOR)
    .contains(value)
}

describe('Страница работает корректно', () => {
  before(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').clear()
    cy.contains('Добавить').should('be.disabled')
    cy.contains('Удалить').should('be.disabled')
    cy.contains('Очистить').should('be.disabled')
  });
    
  it('Добавление выполняется корректно', () => {
    push('1');
    cy.get('[class^=circle_circle]').prev().should('have.text', 'top');
    push('2');
    cy.get('[class^=circle_circle]').prev().should('have.text', 'top');
    push('3');
    cy.get('[class^=circle_circle]').prev().should('have.text', 'top');
  });

  it('Удаление выполняется корректно', () => {
    cy.contains('Удалить').click();
    cy.get('[class^=circle_circle]').last()
      .should('have.css', 'border', CHANGING_COLOR)
      .contains('3')
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').last()
      .contains('2')
    cy.get('[class^=circle_circle]').last().prev()
      .should('have.text', 'top')
  });
  
  it('Стэк очищается корректно', () => {
    cy.get('button').contains('Очистить').click();
    cy.get('[class^=circle_content]').should('have.length', '0');
  })
});