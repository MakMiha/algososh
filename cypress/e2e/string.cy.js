import {
  DELAY_IN_MS,
  DEFAULT_COLOR,
  CHANGING_COLOR,
  MODIFIED_COLOR
} from './utils/constants.cy';

const data = [
  [
    { value: 'w', color: CHANGING_COLOR },
    { value: 'o', color: DEFAULT_COLOR },
    { value: 'r', color: DEFAULT_COLOR },
    { value: 'd', color: CHANGING_COLOR },
  ],
  [
    { value: 'd', color: MODIFIED_COLOR },
    { value: 'o', color: CHANGING_COLOR },
    { value: 'r', color: CHANGING_COLOR },
    { value: 'w', color: MODIFIED_COLOR },
  ],
  [
    { value: 'd', color: MODIFIED_COLOR },
    { value: 'r', color: MODIFIED_COLOR },
    { value: 'o', color: MODIFIED_COLOR },
    { value: 'w', color: MODIFIED_COLOR },
  ],
];

describe('Страница работает корректно', () => {
  before(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('Если инпут пустой, то кнопка заблокирована', () => {
    cy.get('input').clear();
    cy.get('button').should('be.disabled');
  });
    
  it('Строка разворачивается корректно', () => {
    cy.get('input').type('word');
    cy.get('button').contains('Развернуть').click();

    data.forEach((element) => {
      cy.get('[class^=circle_circle]').each((symbol, index) => {
        expect(symbol).to.have.text(element[index].value)
        expect(symbol).to.have.css('border', element[index].color)
      });
      cy.wait(DELAY_IN_MS * 2);
    });
  });
});