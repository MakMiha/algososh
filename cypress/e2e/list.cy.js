import {
  DEFAULT_COLOR,
  CHANGING_COLOR,
  MODIFIED_COLOR,
  SHORT_DELAY_IN_MS,
  DELAY_IN_MS
} from './utils/constants.cy';

describe('Страница работает корректно', () => {
  before(() => {
    cy.visit('http://localhost:3000/list');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').eq(0).clear()
    cy.get('input').eq(1).clear()
    cy.get('button').should('be.disabled')
    cy.contains('Добавить в head').should('be.disabled')
    cy.contains('Добавить в tail').should('be.disabled')
    cy.contains('Добавить по индексу').should('be.disabled')
  });
    
  it('Добавление элемента в head выполняется корректно', () => {
    cy.get('input').eq(0).type('1')
    cy.get('button').contains('Добавить в head').click()
    cy.get('[class^=circle_circle]').first().should('have.text', '1');
    cy.get('[class^=circle_circle]').first()
      .should('have.css', 'border', MODIFIED_COLOR)
      .and('have.text', '1');
    cy.wait(DELAY_IN_MS);
    cy.get('[class^=circle_circle]').first()
      .should('have.css', 'border', DEFAULT_COLOR)
      .and('have.text', '1');
    cy.get('[class^=circle_circle]').first().prev().should('have.text', 'head');
  });

  it('Добавление элемента в tail выполняется корректно', () => {
    cy.get('input').eq(0).type('9')
    cy.get('button').contains('Добавить в tail').click()
    cy.get('[class^=circle_circle]').last().should('have.text', '9');
    cy.wait(DELAY_IN_MS);
    cy.get('[class^=circle_circle]').last()
      .should('have.css', 'border', MODIFIED_COLOR)
      .and('have.text', '9');
    cy.wait(DELAY_IN_MS);
    cy.get('[class^=circle_circle]').last()
      .should('have.css', 'border', DEFAULT_COLOR)
      .and('have.text', '9');
    cy.get('[class^=circle_circle]').last().next().next().should('have.text', 'tail');
  });

  it('Удаление элемента из head выполняется корректно', () => {
    cy.get('button').contains('Удалить из head').click()
    cy.get('[class^=circle_circle]').first().should('not.have.text');
    cy.wait(DELAY_IN_MS);
    cy.get('[class^=circle_circle]').first()
      .should('have.css', 'border', DEFAULT_COLOR)
      .and('not.be.empty')
    cy.get('[class^=circle_circle]').first().prev().should('have.text', 'head');
  });

  it('Удаление элемента из tail выполняется корректно', () => {
    cy.get('button').contains('Удалить из tail').click()
    cy.get('[class^=circle_circle]').last().should('not.have.text');
    cy.wait(DELAY_IN_MS);
    cy.get('[class^=circle_circle]').last()
      .should('have.css', 'border', DEFAULT_COLOR)
      .and('not.be.empty')
    cy.get('[class^=circle_circle]').last().next().next().should('have.text', 'tail');
  });

  it('Добавление элемента по индексу выполняется корректно', () => {
    cy.get('input').eq(0).type('3')
    cy.get('input').eq(1).type(1)
    cy.get('button').contains('Добавить по индексу').click()
    cy.get('[class^=circle_circle]').eq(1).should('have.text', '3');
    cy.wait(DELAY_IN_MS);
    cy.get('[class^=circle_circle]').eq(1)
      .should('have.css', 'border', MODIFIED_COLOR)
      .and('have.text', '3');
    cy.wait(DELAY_IN_MS);
    cy.get('[class^=circle_circle]').eq(1)
      .should('have.css', 'border', DEFAULT_COLOR)
      .and('have.text', '3');
  });

  it('Удаление элемента по индексу выполняется корректно', () => {
    cy.get('input').eq(1).type(1)
    cy.get('button').contains('Удалить по индексу').click()
    cy.get('[class^=circle_circle]').eq(1).should('have.text', '3');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[class^=circle_circle]').eq(1).should('have.css', 'border', CHANGING_COLOR);
    cy.wait(DELAY_IN_MS);
    cy.get('[class^=circle_circle]').eq(1)
      .should('have.css', 'border', DEFAULT_COLOR)
  });
});