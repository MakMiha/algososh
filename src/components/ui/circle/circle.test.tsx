import {render} from '@testing-library/react';
import {Circle} from './circle';
import {ElementStates} from '../../../types/element-states';

describe('Тестирование компонента Circle', () => {
  it('без буквы', () => {
    const circle = render(<Circle />)
    expect(circle).toMatchSnapshot()
  })
  it('c буквами', () => {
    const circle = render(<Circle letter='Тест' />)
    expect(circle).toMatchSnapshot()
  })
  it('с head', () => {
    const circle = render(<Circle head={'head'} />)
    expect(circle).toMatchSnapshot()
  })
 it('с react-элементом в head', () => {
    const circle = render(<Circle head={<Circle />} />)
    expect(circle).toMatchSnapshot()
  })
  it('с tail', () => {
    const circle = render(<Circle tail={'tail'} />)
    expect(circle).toMatchSnapshot()
  })
  it('с react-элементом в tail', () => {
    const circle = render(<Circle tail={<Circle />} />)
    expect(circle).toMatchSnapshot()
  })
  it('с index', () => {
    const circle = render(<Circle index={0} />)
    expect(circle).toMatchSnapshot()
  })
  it('с пропом isSmall ===  true', () => {
    const circle = render(<Circle isSmall />)
    expect(circle).toMatchSnapshot()
  })
  it('в состоянии default', () => {
    const circle = render(<Circle state={ElementStates.Default} />)
    expect(circle).toMatchSnapshot()
  })
  it('в состоянии changing', () => {
    const circle = render(<Circle state={ElementStates.Changing} />)
    expect(circle).toMatchSnapshot()
  })
  it('в состоянии modified', () => {
    const circle = render(<Circle state={ElementStates.Modified} />)
    expect(circle).toMatchSnapshot()
  })
})