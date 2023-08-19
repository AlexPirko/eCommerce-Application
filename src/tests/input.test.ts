import { Input } from '@components/common/input/Input';
//  eslint-disable-next-line max-lines-per-function
describe('Input Class Tests', () => {
  let inputInstance: Input;

  beforeEach(() => {
    const mockInputData = {
      type: 'text',
      id: 1,
      classNames: ['input-field'],
      placeholder: 'Enter your name',
      value: 'John Doe',
    };

    inputInstance = new Input(mockInputData);
  });

  // test('Input instance should be created correctly', () => {
  //   expect(inputInstance).toBeInstanceOf(Input);
  //   expect(inputInstance.type).toBe('text');
  //   expect(inputInstance.id).toBe(1);
  //   expect(inputInstance.classNames).toEqual(['input-field']);
  //   expect(inputInstance.placeholder).toBe('Enter your name');
  //   expect(inputInstance.value).toBe('John Doe');
  // });

  test('getInputElement method should return an HTMLInputElement', () => {
    const inputElement = inputInstance.getInputElement();
    expect(inputElement).toBeInstanceOf(HTMLInputElement);
    expect(inputElement.type).toBe('text');
    expect(inputElement.id).toBe('1');
    expect(inputElement.placeholder).toBe('Enter your name');
    expect(inputElement.value).toBe('John Doe');
  });

  test('createInputElement method should create and configure an input element', () => {
    const inputElement = inputInstance['createInputElement']();
    expect(inputElement).toBeInstanceOf(HTMLInputElement);
    expect(inputElement.type).toBe('text');
    expect(inputElement.id).toBe('1');
    expect(inputElement.placeholder).toBe('Enter your name');
    expect(inputElement.value).toBe('John Doe');
  });
});
