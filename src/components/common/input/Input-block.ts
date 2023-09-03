import './input.scss';
import { Input } from './Input';
import { IInputBlock } from '@lib/types/input-interface';

export default class InputBlock extends Input {
  private label: string;
  public create: HTMLDivElement;

  constructor({
    type = 'text',
    id,
    label,
    classNames = [''],
    placeholder,
    value = '',
    name,
    disabled = false,
  }: IInputBlock) {
    super({ type, id, classNames, placeholder, value, name, disabled });
    this.label = label;
    this.create = this.createInputBlock();
  }

  public createLabel(): HTMLLabelElement {
    const label: HTMLLabelElement = document.createElement('label');
    label.setAttribute('for', this.id.toString());
    label.textContent = this.label;
    return label;
  }

  public createErrorBlock(): HTMLSpanElement {
    const error: HTMLSpanElement = document.createElement('span');
    error.classList.add('error-text');
    return error;
  }

  public createInputBlock(): HTMLDivElement {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('input-wrapper');

    const input: HTMLInputElement = this.getInputElement();
    if (this.type === 'text') {
      const atr: string = this.label.split(' ')[0];
      input.setAttribute('data-type', atr);
    }
    input.setAttribute('name', this.name);
    input.addEventListener('input', this.handleInput.bind(this, input));
    const label: HTMLLabelElement | null = this.type === 'password' ? this.passwordInput(input) : null;

    wrapper.append(this.createLabel(), input, this.createErrorBlock());
    if (label !== null) wrapper.append(label);
    return wrapper;
  }

  public handleInput(input: HTMLInputElement): void {
    input.classList.remove('error');
    this.value = input.value;
  }

  public passwordInput(input: HTMLInputElement): HTMLLabelElement {
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
