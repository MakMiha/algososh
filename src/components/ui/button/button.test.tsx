import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Тестирование кнопок', () => {
  it('Кнопка с текстом', () => {
    const button = render(<Button text='Тест' />);
    expect(button).toMatchSnapshot();
  });

  it('Кнопка без текста', () => {
    const button = render(<Button />);
    expect(button).toMatchSnapshot();
  });

  it('Заблокированная кнопка', () => {
    const button = render(<Button disabled />);
    expect(button).toMatchSnapshot();
  });

  it('Кнопка с индикатором загрузки', () => {
    const button = render(<Button isLoader />);
    expect(button).toMatchSnapshot();
  });

  it('Колбек при клике на кнопку', () => {
    window.alert = jest.fn();
    render(<Button text='Тест' onClick={()=>{alert('Тест прошел успешно')}} />);
    const link = screen.getByText('Тест');
    fireEvent.click(link);
    expect(window.alert).toHaveBeenCalledWith('Тест прошел успешно');
  });
});