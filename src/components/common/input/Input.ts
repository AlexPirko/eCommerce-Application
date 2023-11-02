import './input.scss';
import { IInput } from '@lib/types/input-interface';
import { validate } from '@lib/utils/validate';
export class Input {
  protected type: string;
  protected id: number | string;
  protected name: string;
  private classNames: string[];
  private placeholder: string;
  public value: string;
  private disabled: boolean;

  constructor({ type = 'text', id, classNames = [''], placeholder, value = '', name, disabled = false }: IInput) {
    this.type = type;
    this.id = id;
    this.classNames = classNames;
    this.placeholder = placeholder;
    this.value = value;
    this.name = name;
    this.disabled = disabled;
  }

  private createInputElement(): HTMLInputElement {
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', this.type);
    input.setAttribute('id', `${this.id}`);
    input.setAttribute('autocomplete', 'on');
    input.classList.add('validate');
    input.setAttribute('placeholder', this.placeholder ?? '');
    input.setAttribute('value', this.value ?? '');
    input.setAttribute('name', this.name);
    if (this.disabled) {
      input.setAttribute('disabled', `${this.disabled}`);
    }
    if (this.classNames[0] !== '') input.classList.add(...this.classNames);
    input.addEventListener('input', (): void => {
      if (input.closest('.none')) {
        input.classList.remove('invalid');
      } else {
        validate(input.value, input);
      }
    });
    input.addEventListener('blur', (): void => {
      if (input.closest('.none')) {
        input.classList.remove('invalid');
      } else {
        validate(input.value, input);
      }
    });

    return input;
  }

  public getInputElement(): HTMLInputElement {
    const input: HTMLInputElement = this.createInputElement();
    return input;
  }
}
