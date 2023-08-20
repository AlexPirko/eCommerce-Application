import { Input } from '@components/common/input/Input';

describe('Input Class Tests', () => {
  let input: Input;

  beforeEach(() => {
    const mockInputData = {
      type: 'text',
      id: 1,
      classNames: [],
      placeholder: 'Enter your name',
      value: 'Oks Pozd',
      name: 'InputName',
    };

    input = new Input(mockInputData);
  });

  test('getInputElement method should return an HTMLInputElement', () => {
    const inputElement = input.getInputElement();
    expect(inputElement.type).toBe('text');
    expect(inputElement.id).toBe('1');
    expect(inputElement.placeholder).toBe('Enter your name');
    expect(inputElement.value).toBe('Oks Pozd');
    expect(inputElement.name).toBe('InputName');
  });
});
