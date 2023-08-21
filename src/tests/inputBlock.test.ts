/* eslint-disable max-lines-per-function */
import InputBlock from '@components/common/input/Input-block';

describe('InputBlock class', () => {
  it('should create an instance of InputBlock', () => {
    const inputBlock = new InputBlock({
      type: 'text',
      id: 1,
      label: 'Test Label',
      classNames: ['test'],
      placeholder: 'Test Placeholder',
      value: '',
      name: 'test name',
    });

    expect(inputBlock).toBeInstanceOf(InputBlock);
  });

  it('should create a label element', () => {
    const inputBlock = new InputBlock({
      type: 'text',
      id: 1,
      label: 'Test Label',
      classNames: ['test'],
      placeholder: 'Test Placeholder',
      value: '',
      name: 'test name',
    });

    const label = inputBlock.createLabel();
    expect(label).toBeInstanceOf(HTMLLabelElement);
    expect(label.textContent).toBe('Test Label');
    expect(label.getAttribute('for')).toBe('1');
  });

  it('should remove error class and update value on handleInput', () => {
    const inputBlock = new InputBlock({
      type: 'text',
      id: 1,
      label: 'Test Label',
      classNames: ['test'],
      placeholder: 'Test Placeholder',
      value: '',
      name: 'test name',
    });

    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'test value';
    input.classList.add('error');

    inputBlock.handleInput(input);

    expect(input.classList.contains('error')).toBe(false);
    expect(inputBlock.value).toBe('test value');
  });

  it('should toggle password visibility on checkbox click', () => {
    const input = document.createElement('input');
    input.type = 'password';

    const inputBlock = new InputBlock({
      type: 'password',
      id: 1,
      label: 'Test Label',
      classNames: ['test'],
      placeholder: 'Test Placeholder',
      value: '',
      name: 'test name',
    });

    const label = inputBlock.passwordInput(input);
    expect(input.type).toBe('password');
    const checkbox = label.querySelector('.password-checkbox') as HTMLInputElement;
    checkbox.click();
    expect(input.type).toBe('text');
    checkbox.click();
    expect(input.type).toBe('password');
  });
});
