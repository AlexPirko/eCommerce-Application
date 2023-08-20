import './input.scss';
import { Input } from './Input';
import { IInputBlock } from '@lib/types/input-interface';

export default class InputBlock extends Input {
  private label: string;
  public create: HTMLDivElement;

  constructor({ type, id, label, classNames, placeholder, value }: IInputBlock) {
    super({ type, id, classNames, placeholder, value });
    this.label = label;
    this.create = this.createInputBlock();
  }

  private createLabel(): HTMLLabelElement {
    const label: HTMLLabelElement = document.createElement('label');
    label.setAttribute('for', this.id.toString());
    label.textContent = this.label;
    return label;
  }

  private createErrorBlock(): HTMLSpanElement {
    const error: HTMLSpanElement = document.createElement('span');
    error.classList.add('error-text');
    return error;
  }

  private createInputBlock(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('input-wrapper');

    const input: HTMLInputElement = this.getInputElement();
    if (this.type === 'text') {
      const atr: string = this.label.split(' ')[0];
      input.setAttribute('data-type', atr);
    }
    input.setAttribute('name', this.label.toLowerCase());
    input.addEventListener('input', this.handleInput.bind(this, input));
    const label: HTMLLabelElement | null = this.type === 'password' ? this.passwordInput(input) : null;

    wrapper.append(this.createLabel(), input, this.createErrorBlock());
    if (label !== null) wrapper.append(label);
    return wrapper;
  }

  private handleInput(input: HTMLInputElement): void {
    input.classList.remove('error');
    this.value = input.value;
  }

  private passwordInput(input: HTMLInputElement): HTMLLabelElement {
    input.setAttribute('data-type', 'password');

    const label: HTMLLabelElement = document.createElement('label');
    label.classList.add('password');

    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('password-checkbox');
    checkbox.addEventListener('click', (): void => {
      input.type = input.type === 'password' ? 'text' : 'password';
    });

    const span: HTMLSpanElement = document.createElement('span');
    span.textContent = 'Show password';

    label.append(checkbox, span);
    return label;
  }
}
