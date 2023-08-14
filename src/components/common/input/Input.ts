import './input.scss';
import { IInput } from 'src/lib/types/interfaces';
import { validate } from 'src/lib/utils/validate';
export class Input {
  protected type: string;
  protected id: number;
  private classNames: string[];
  private placeholder: string;
  public value: string;

  constructor({ type, id, classNames, placeholder, value }: IInput) {
    this.type = type;
    this.id = id;
    this.classNames = classNames;
    this.placeholder = placeholder;
    this.value = value;
  }

  private createInputElement(): HTMLInputElement {
    const input: HTMLInputElement = document.createElement('input');
    input.setAttribute('type', this.type);
    input.setAttribute('id', `${this.id}`);
    input.setAttribute('autocomplete', 'on');
    input.classList.add('validate');
    input.setAttribute('placeholder', this.placeholder ?? '');
    input.setAttribute('value', this.value ?? '');
    input.addEventListener('input', (): void => {
      validate(input.value, input);
    });
    return input;
  }

  public getInputElement(): HTMLInputElement {
    const input: HTMLInputElement = this.createInputElement();
    return input;
  }
}
